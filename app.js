const express = require("express");
const app = express();
const port = 5000;

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
