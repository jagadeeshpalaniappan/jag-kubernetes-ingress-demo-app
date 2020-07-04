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
// app.get("/", (req, res) => res.send("Welcome to Jag's Blogs Home Page"));
app.use(express.static(path.join(__dirname, "build")));

app.use(express.json());

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log(`App is running at [PORT:${PORT}]`));
