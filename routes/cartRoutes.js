const express = require("express");

const {
  getAllCarts,
  getCart,
  createCart,
  deleteCart,
  updateCart,
  setUserId,
} = require("../controller/cartController");

const {
  protectMiddleware,
  restrictToMiddleware,
} = require("../controller/authController");

const cartRouter = express.Router();

cartRouter
  .route("/")
  .get(getAllCarts)
  .post(
    protectMiddleware,
    restrictToMiddleware("user", "admin"),
    setUserId,
    createCart
  );

cartRouter
  .route("/:id")
  .get(getCart)
  .patch(protectMiddleware, restrictToMiddleware("user", "admin"), updateCart)
  .delete(protectMiddleware, restrictToMiddleware("user", "admin"), deleteCart);

module.exports = cartRouter;
