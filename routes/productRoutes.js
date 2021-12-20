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
} = require("../controller/productController");

const {
  protectMiddleware,
  restrictToMiddleware,
} = require("../controller/authController");

const productRouter = express.Router();

productRouter
  .route("/")
  .get(getAllProducts)
  .post(
    protectMiddleware,
    restrictToMiddleware("seller", "admin"),
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
