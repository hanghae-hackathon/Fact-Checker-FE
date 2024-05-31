// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/get-result", {
      target: "http://172.190.90.75:5000",
      changeOrigin: true,
    }),
  );
};
