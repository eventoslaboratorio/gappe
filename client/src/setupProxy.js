const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/gappe-v2/us-central1/api"
      }
    })
  );
};

//"proxy": "http://localhost:5000/gappe-v2/us-central1/",