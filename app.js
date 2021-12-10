const express = require("express");
const app = express();

const productRouter = require("./routes/productRouter");

app.use("/api/v2/products", productRouter);

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

const PORT = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
