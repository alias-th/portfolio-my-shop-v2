const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: [true, "Name can not be empty!"],
    },
    price: {
      type: Number,
      required: [true, "A cart must have a price"],
    },
    color: {
      type: String,
      required: [true, "A cart must have a color"],
    },
    size: {
      type: String,
      required: [true, "A cart must have a size"],
    },
    quantity: {
      type: Number,
      required: [true, "A cart must have a quantity"],
      default: 1,
    },
    description: {
      type: String,
      required: [true, "A cart must have a description"],
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A cart must have a cover image"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Cart must belong to a user!"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
