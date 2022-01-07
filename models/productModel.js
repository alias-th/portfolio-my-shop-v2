const mongoose = require("mongoose");

const slugify = require("slugify");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
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
      required: [true, "A product must have a price"],
    },
    imageCover: {
      type: String,
      required: [true, "A product must have a cover image"],
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
    bands: {
      type: String,
      required: [true, "A product must have a band"],
      enum: {
        values: ["nike", "converse", "new-balance", "vans"],
        message: "Difficulty is either : nike, converse, new balance, vans",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      max: [5, "Rating must be below 5.0"],
      min: [1, "Rating must be above 1.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// display review in response not save to DB (getProduct)
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
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
