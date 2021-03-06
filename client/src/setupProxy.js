const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    [
      "/api",
      "/uploads/images",
      "/uploads/images/users",
      "/uploads/images/products",
    ],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
