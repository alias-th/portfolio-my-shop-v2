const multer = require("multer");

const sharp = require("sharp");

const User = require("../models/userModel");

const { catchAsync } = require("../utils/catchAsync");

const AppError = require("../utils/appError");

// upload image middleware
const multerStorage = multer.memoryStorage(); // store in buffer

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.uploadUserPhotoMiddleware = upload.single("photo");

exports.resizeUserPhotoMiddleware = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpg")
    .jpeg({ quality: 90 })
    .toFile(`client/public/images/users/${req.file.filename}`);

  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // create error if user POST password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This route is not for updates password!", 400));
  }

  // Filtered out unwanted fields names that are not allowed to be updated
  const filterBody = filterObj(req.body, "name", "email");
  if (req.file) filterBody.photo = req.file.filename;

  // update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

exports.getCurrentUserMiddleware = (req, res, next) => {
  // req.user.id from protectMiddleware
  req.params.id = req.user.id;
  next();
};

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  const doc = await User.findById(req.params.id);

  res.status(200).json({
    status: "get current user successfully",
    data: doc,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "find users successfully",
    results: users.length,
    data: users,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new AppError(`No document found with that id ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    status: "find a user successfully",
    data: user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new AppError(`No document found with that id ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    status: "updated user successfully",
    data: user,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(
      new AppError(`No document found with that id ${req.params.id}`),
      404
    );
  }

  res.status(204).json({
    status: "delete data successfully",
    data: null,
  });
});