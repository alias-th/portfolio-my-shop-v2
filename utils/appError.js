class AppError extends Error {
  // can define message and status code
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;

    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
