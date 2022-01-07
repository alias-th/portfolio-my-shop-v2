const crypto = require("crypto");

const mongoose = require("mongoose");

const validator = require("validator");

const bcryptJS = require("bcryptjs");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email!"],
    },
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minlength: [6, "passwords must be at least 6 characters"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        // this only work on CREATE and SAVE
        validator: function (el) {
          return el === this.password;
        },
        message: "Password are not the same!",
      },
    },
    photo: {
      type: String,
      default: "default.png",
    },
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female", "not-say"],
      default: "not-say",
    },

    active: {
      type: Boolean,
      default: true,
    },
    phoneNumber: String,
    birthday: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// hash password
userSchema.pre("save", async function (next) {
  // if password not change return next
  if (!this.isModified("password")) return next();

  // hash password and save to database
  this.password = await bcryptJS.hash(this.password, 12);

  // not pass to database
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// userSchema.pre(/^find/, function (next) {
//   this.find({ active: true });
//   next();
// });

// decode password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcryptJS.compare(candidatePassword, userPassword);
};

// if return true, it will error
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
