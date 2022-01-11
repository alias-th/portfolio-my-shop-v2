const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "Order must belong to a Product!"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Order must belong to a User!"],
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Order must belong to a Seller!"],
  },
  price: {
    type: Number,
    required: [true, "Order must have a price"],
  },
  imageCover: {
    type: String,
    required: [true, "A product must have a cover image"],
  },
  quantity: {
    type: Number,
    required: [true, "Order must have quantity"],
  },
  color: {
    type: String,
    required: [true, "Order must have color"],
  },
  size: {
    type: String,
    required: [true, "Order must have size"],
  },
  status: {
    type: String,
    enum: ["prepare", "shipping", "shipped"],
    default: "prepare",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
