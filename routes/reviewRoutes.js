const express = require("express");

const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setProductUserIds,
  getReview,
} = require("../controller/reviewController");

const {
  protectMiddleware,
  restrictToMiddleware,
} = require("../controller/authController");

const reviewRouter = express.Router({ mergeParams: true }); //access :reviewId/reviews

reviewRouter.use(protectMiddleware);

reviewRouter
  .route("/")
  .get(getAllReviews)
  .post(restrictToMiddleware("user", "admin"), setProductUserIds, createReview);

reviewRouter
  .route("/:id")
  .get(getReview)
  .patch(restrictToMiddleware("user", "admin"), updateReview)
  .delete(restrictToMiddleware("user", "admin"), deleteReview);

module.exports = reviewRouter;
