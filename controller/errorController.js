const AppError = require("../utils/appError");

// helper function
const handleValidationErrorDatabase = (error) => {
  const errors = Object.values(error.errors).map((el) => el.message); // array
  const messages = `Invalid input data! ${errors.join(". ")} !`;
  return new AppError(messages, 400);
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue;

  const message = `Duplicate field value : ${Object.values(value)}`;

  return new AppError(message, 400);
};

const sendErrorProd = (err, res, next) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    next();
  }
};

const handleJWTError = (err) => {
  new AppError(`${err.message}. Please login again!`, 401);
};

const handleJWTExpiredError = (err) => {
  new AppError(`${err.message}. Please login again!`, 401);
};

module.exports = (err, req, res, next) => {
  console.log(err.name);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      errors: err,
      message: err.message,
      stack: err.stack,
    });
    next();
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.assign(err);
    console.log(error);

    if (error.name === "ValidationError")
      error = handleValidationErrorDatabase(error);

    if (error.name === "CastError") error = handleCastErrorDB(error);

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    if (error.name === "JsonWebTokenError") error = handleJWTError(error);

    if (error.name === "TokenExpiredError")
      error = handleJWTExpiredError(error);

    sendErrorProd(error, res, next);
  }
};
