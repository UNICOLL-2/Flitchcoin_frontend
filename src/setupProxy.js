const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://34.73.24.72',
      changeOrigin: true,
      pathRewrite: {'^/' : ''}
    })
  );
};
