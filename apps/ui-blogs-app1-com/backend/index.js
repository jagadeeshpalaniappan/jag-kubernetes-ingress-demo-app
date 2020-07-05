// require("dotenv").config();
const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const PORT = process.env.PORT || 8080;

// Proxy to POSTS_API:
const POSTS_API = "http://api-post-svc.app1-ns.svc.cluster.local";
const proxyToPostApiOptions = {
  target: POSTS_API,
  changeOrigin: true,
  proxyTimeout: 5000,
};
const proxyToPostApi = createProxyMiddleware(proxyToPostApiOptions);
app.use("/api/**/posts**", proxyToPostApi);

// React App: 'build' dir as static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.listen(PORT, () => console.log(`App is running at [PORT:${PORT}]`));
