const Order = require("../models/orderModel");

const AppError = require("../utils/appError");

const { catchAsync } = require("../utils/catchAsync");

exports.createOrder = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const order = await Order.create(req.body);

  if (!order) {
    return next(new AppError("cannot create order", 404));
  }

  res.status(201).json({
    status: "success",
    data: order,
  });
});

exports.getOrderByUser = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const order = await Order.find({ user: req.user.id });

  if (!order) {
    return next(new AppError("no order found", 404));
  }

  res.status(200).json({
    status: "success",
    data: order,
  });
});
