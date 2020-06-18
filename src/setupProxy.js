const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // ...You can now register proxies as you wish!
  app.use(createProxyMiddleware('/api', { 
    target: 'http://localhost:5000',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
     "^/api": "/"
    },
   }));
   app.use(createProxyMiddleware('/apc', { 
    target: 'http://api.map.baidu.com',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
     "^/apc": "/"
    },
   }));
  //app.use(proxy('/apc', { target: 'http://172.19.5.34:9531' }));
};