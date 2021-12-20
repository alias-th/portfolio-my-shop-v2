const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/uploads/images"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
