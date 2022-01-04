const express = require("express");

const {
  createNewProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImagesMiddleware,
  resizeProductImagesMiddleware,
  getProductWithSlug,
  getProductWithIdSeller,
} = require("../controller/productController");

const {
  protectMiddleware,
  restrictToMiddleware,
} = require("../controller/authController");

const reviewRouter = require("./reviewRoutes");

const productRouter = express.Router();

productRouter.use("/:productId/reviews", reviewRouter);

productRouter
  .route("/seller")
  .get(
    protectMiddleware,
    restrictToMiddleware("seller", "admin"),
    getProductWithIdSeller
  );

productRouter
  .route("/")
  .get(getAllProducts)
  .post(
    protectMiddleware,
    restrictToMiddleware("seller", "admin"),
    uploadProductImagesMiddleware,
    resizeProductImagesMiddleware,
    createNewProduct
  );

productRouter
  .route("/:id")
  .get(getProduct)
  .patch(
    protectMiddleware,
    restrictToMiddleware("seller", "admin"),
    uploadProductImagesMiddleware,
    resizeProductImagesMiddleware,
    updateProduct
  )
  .delete(
    protectMiddleware,
    restrictToMiddleware("seller", "admin"),
    deleteProduct
  );

productRouter.route("/product/:slug").get(getProductWithSlug);

module.exports = productRouter;
