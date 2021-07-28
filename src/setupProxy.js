const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://www.beacontracker.software:2000",
      changeOrigin: true
    })
  );

  app.use(
    createProxyMiddleware("/api/v1", {
      target: "https://onesignal.com",
      changeOrigin: true
    })
  );
};