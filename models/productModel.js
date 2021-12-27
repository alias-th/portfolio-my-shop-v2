const mongoose = require("mongoose");

const slugify = require("slugify");

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "A product must have a description"],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, "A product must have a quantity"],
    default: 1,
  },
  price: {
    type: Number,
    require: [true, "A product must have a price"],
  },
  imageCover: {
    type: String,
    require: [true, "A product must have a cover image"],
  },
  images: [String],
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  categories: {
    type: String,
    required: [true, "A product must have a category"],
    enum: {
      values: ["shoes", "clothing"],
      message: "Difficulty is either : shoes, clothing",
    },
  },
  slug: String,
});

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "seller",
    select: "email name photo",
  });

  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
