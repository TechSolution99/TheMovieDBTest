const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/movie',
    createProxyMiddleware({
      target: 'https://api.themoviedb.org/3',
      changeOrigin: true
    })
  );
  app.use(
    '/genre',
    createProxyMiddleware({
      target: 'https://api.themoviedb.org/3',
      changeOrigin: true
    })
  );
};