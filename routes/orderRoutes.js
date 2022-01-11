const express = require("express");

const { createOrder } = require("../controller/orderController");

const {
  protectMiddleware,
  restrictToMiddleware,
} = require("../controller/authController");

const orderRouter = express.Router();

orderRouter
  .route("/")
  .post(protectMiddleware, restrictToMiddleware("user", "admin"), createOrder);

module.exports = orderRouter;
