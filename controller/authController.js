const crypto = require("crypto");

const { promisify } = require("util");

const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const { catchAsync } = require("../utils/catchAsync");

const AppError = require("../utils/appError");

const Email = require("../utils/email");

// helper function
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, req, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };

  res.cookie("jwt", token, cookieOptions);

  return token;
};

exports.signup = catchAsync(async (req, res) => {
  // console.log(req.body);

  const newUser = await User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  res.status(201).json({
    status: "create user successfully",
    data: {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check if email and password not exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  // 2) check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("These is no user with email address.", 404));
  }
  // 2.1) compare req.password and bcrypt
  const correct = await user.correctPassword(password, user.password);
  if (!user || !correct) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) if everything ok, send token to client
  const token = createSendToken(user, req, res);

  res.status(200).json({
    status: "login successfully",
    id: user._id,
    token,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) get user from collection
  const user = await User.findOne({ _id: req.user.id }).select("+password");

  // 2) check if current password is correct
  const correct = await user.correctPassword(
    req.body.currentPassword,
    user.password
  );

  if (!correct) {
    return next(new AppError("Your current password is wrong", 401));
  }

  // 3) update password
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  await user.save();

  const token = createSendToken(user, req, res);

  res.status(200).json({ status: "updated password successfully", token });
});

// middleware
exports.protectMiddleware = catchAsync(async (req, res, next) => {
  // 1) check if token exist
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // we set headers authorization in postman for dev
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in, Please login to get access!", 401)
    );
  }

  // 2) verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does not exist.")
    );
  }

  // 4) check if user change password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password!, Please login again!", 401)
    );
  }

  // 5) can access
  req.user = currentUser;
  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    // verify token
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    // check if user still exists
    const currentUser = await User.findById(decoded.id);

    // console.log(currentUser);

    if (!currentUser) {
      return next();
    }

    // check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next();
    }

    res.status(200).json({
      status: "success",
      data: {
        id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
        photo: currentUser.photo,
        role: currentUser.role,
        gender: currentUser.gender,
        active: currentUser.active,
      },
    });
  }

  return;
});

exports.restrictToMiddleware = function (...roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    status: "logged out successfully",
  });
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // get user base on email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("These is no user with email address.", 404));
  }

  // generate the random reset token
  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  // send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/resetPassword/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    next(
      new AppError("There was an error sending email. Try again later!", 400)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // get user base on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // if token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  // update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  const token = createSendToken(user, req, res);

  // log in and send JWT
  res.status(200).json({
    status: "update password successfully",
    id: user._id,
    token,
  });
});
