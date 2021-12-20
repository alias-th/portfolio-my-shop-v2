const multer = require("multer");

const sharp = require("sharp");

const Product = require("../models/productModel");

const { catchAsync } = require("../utils/catchAsync");

const APIFeatures = require("../utils/apiFeatures");

const AppError = require("../utils/appError");

// upload image
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadProductImagesMiddleware = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

exports.resizeProductImagesMiddleware = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();

  // cover image
  req.body.imageCover = `product-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`client/public/images/products/${req.body.imageCover}`);

  // images
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `product-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
      await sharp(file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`client/public/images/products/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

exports.createNewProduct = catchAsync(async (req, res) => {
  const doc = await Product.create(req.body);

  res.status(200).json({
    status: "create new Product successfully",
    data: {
      id: doc._id,
      name: doc.name,
      description: doc.description,
      quantity: doc.quantity,
      price: doc.price,
      seller: doc.seller,
      image: doc.image,
      imageCover: doc.imageCover,
    },
  });
});

exports.getAllProducts = catchAsync(async (req, res) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  res.status(200).json({
    status: "find product successfully",
    result: products.length,
    data: { products },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const doc = await Product.findById(req.params.id);

  if (!doc) {
    return next(new AppError("no product found", 404));
  }

  res.status(200).json({
    status: "get a product successfully",
    data: doc,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const doc = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError("no product found", 404));
  }

  res.status(200).json({
    status: "updated a product successfully",
    data: doc,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const doc = await Product.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("no product found", 404));
  }

  res.status(204).json({
    status: "delete a product successfully",
    data: null,
  });
});

exports.getProductWithSlug = catchAsync(async (req, res, next) => {
  const tour = await Product.findOne({ slug: req.params.slug });

  if (!tour) {
    return next(new AppError("There is no tour with the that name", 404));
  }

  res.status(200).json({
    status: "success",
    data: tour,
  });
});