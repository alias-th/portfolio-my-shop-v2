const Cart = require("../models/cartModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const { catchAsync } = require("../utils/catchAsync");

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id; // from protect middleware
  next();
};

exports.getAllCarts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Cart.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const carts = await features.query;

  res.status(200).json({
    status: "find carts successfully",
    result: carts.length,
    data: { carts },
  });
});

exports.getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);

  if (!cart) {
    return next(new AppError("No cart found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: cart,
  });
});

exports.createCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.create(req.body);
  res.status(201).json({
    status: "success",
    data: cart,
  });
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!cart) {
    return next(new AppError("No cart found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: cart,
  });
});

exports.deleteCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findByIdAndDelete(req.params.id);

  if (!cart) {
    return next(new AppError("No cart found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
