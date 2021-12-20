const express = require("express");

const {
  signup,
  login,
  protectMiddleware,
  updatePassword,
  restrictToMiddleware,
  logout,
  forgotPassword,
  resetPassword,
  isLoggedIn,
} = require("../controller/authController");

const {
  getCurrentUserMiddleware,
  getCurrentUser,
  getAllUser,
  deleteMe,
  uploadUserPhotoMiddleware,
  resizeUserPhotoMiddleware,
  updateMe,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

const userRouter = express.Router();

userRouter.route("/signup").post(signup);

userRouter.route("/login").post(login);

userRouter.post("/forgotPassword", forgotPassword);

userRouter.patch("/resetPassword/:token", resetPassword);

userRouter.route("/isLoggedIn").get(isLoggedIn);

userRouter.use(protectMiddleware); // can get req.user

userRouter.route("/me").get(getCurrentUserMiddleware, getCurrentUser);

userRouter
  .route("/updateMe")
  .patch(uploadUserPhotoMiddleware, resizeUserPhotoMiddleware, updateMe);

userRouter.route("/updatePassword").patch(updatePassword);

userRouter.delete("/deleteMe", deleteMe);

userRouter.get("/logout", logout);

userRouter.use(restrictToMiddleware("admin"));

userRouter.route("/").get(getAllUser);

userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;
