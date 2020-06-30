// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { createProxyMiddleware } = require("http-proxy-middleware");
const userRouter = require("./modules/user/user.route");
const app = express();

const PORT = process.env.PORT || 8080;
const MONGODB_URL =
  "mongodb://db-mongo-svc.app1-ns.svc.cluster.local:27017/users-db";
const DATABASE_URL = process.env.DATABASE_URL || MONGODB_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("connected", () => console.log("Connected to MongoDB!", MONGODB_URL));
db.on("error", (err) => console.error("MongoDB connection error:", err));

app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "RUNNING" }));

app.use("/api/v1/users", userRouter);

// Proxy to POSTS_API:
const POSTS_API = "http://api-post-svc.app1-ns.svc.cluster.local";
const proxyToPostApiOptions = { target: POSTS_API, changeOrigin: true };
const proxyToPostApi = createProxyMiddleware(proxyToPostApiOptions);
app.use("/api/**/posts**", proxyToPostApi);

app.listen(PORT, () => console.log(`User API Server started PORT:${PORT}!`));
