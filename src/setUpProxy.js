// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/get-result", {
      target: "https://app.ekwak.com",
      changeOrigin: true,
    }),
  );
};
