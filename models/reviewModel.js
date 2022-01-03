const mongoose = require("mongoose");

const Product = require("./productModel");

const reviewSchema = new mongoose.Schema({
  review: {
    type: "String",
    required: [true, "Review can not be empty!"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "Review must belong to a product!"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user!"],
  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
});

reviewSchema.statics.calcAverageRating = async function (productId) {
  const stats = await this.aggregate([
    {
      $math: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post("save", function () {
  console.log(this.constructor, "constructor");
  this.constructor.calcAverageRating(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  console.log(this.r, "this r");
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRating(this.r.product);
});

const Review = mongoose.modal("Review", reviewSchema);

module.exports = Review;
