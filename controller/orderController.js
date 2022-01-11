const Order = require("../models/orderModel");

const AppError = require("../utils/appError");

const { catchAsync } = require("../utils/catchAsync");

exports.createOrder = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const order = await Order.create(req.body);

  res.status(201).json({
    status: "success",
    data: order,
  });
});
