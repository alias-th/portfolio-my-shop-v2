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

// reviewRouter.use(protectMiddleware);

reviewRouter
  .route("/")
  .get(getAllReviews)
  .post(
    protectMiddleware,
    restrictToMiddleware("user", "admin"),
    setProductUserIds,
    createReview
  );

reviewRouter
  .route("/:id")
  .get(getReview)
  .patch(protectMiddleware, restrictToMiddleware("user", "admin"), updateReview)
  .delete(
    protectMiddleware,
    restrictToMiddleware("user", "admin"),
    deleteReview
  );

module.exports = reviewRouter;
