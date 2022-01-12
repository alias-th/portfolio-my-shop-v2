const express = require("express");

const {
  createOrder,
  getOrderByUser,
} = require("../controller/orderController");

const {
  protectMiddleware,
  restrictToMiddleware,
} = require("../controller/authController");

const orderRouter = express.Router();

orderRouter
  .route("/")
  .post(protectMiddleware, restrictToMiddleware("user", "admin"), createOrder);

orderRouter
  .route("/user")
  .get(
    protectMiddleware,
    restrictToMiddleware("user", "admin"),
    getOrderByUser
  );

module.exports = orderRouter;
