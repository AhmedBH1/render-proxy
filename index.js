const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server
const proxy = httpProxy.createProxyServer({ changeOrigin: true });

// Create an HTTP server that listens to requests and proxies them
const server = http.createServer((req, res) => {
  proxy.web(req, res, {
    target: 'https://www.facebook.com',
    secure: false, // ignore self-signed SSL errors if needed
    headers: {
      host: 'www.facebook.com',
      'user-agent': req.headers['user-agent'], // pass through UA
    }
  });
});

// Listen on the port provided by Render or default to 8080
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`✅ Proxy to Facebook is running on port ${PORT}`);
});
