const express = require("express");

const morgan = require("morgan");

const cookieParser = require("cookie-parser");

const app = express();

// Routes
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

// Handle Error
const globalErrorHandler = require("./controller/errorController");

// MiddleWare
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

// Serve Html Client
if (process.env.NODE_ENV === "production") {
  const path = require("path");

  // serve production assets e.g. main.js if route exists
  app.use(express.static(path.resolve(__dirname, "./client/build")));

  // serve index.html if route is not recognized
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
}

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

app.use(globalErrorHandler);

module.exports = app;
