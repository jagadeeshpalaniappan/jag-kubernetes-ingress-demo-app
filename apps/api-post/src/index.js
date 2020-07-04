// @ts-nocheck
// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morganBody = require("morgan-body");
const postRouter = require("./modules/post/post.route");
const app = express();

const PORT = process.env.PORT || 80;
const MONGODB_URL =
  "mongodb://db-mongo-svc.app1-ns.svc.cluster.local:27017/posts-db";
const DATABASE_URL = process.env.DATABASE_URL || MONGODB_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("connected", () => console.log("Connected to MongoDB!", MONGODB_URL));
db.on("error", (err) => console.error("MongoDB connection error:", err));

app.use(express.json());

// logging: request
morganBody(app);

app.use("/api/v1/posts", postRouter);

app.get("/health", (req, res) => res.json({ status: "RUNNING" }));

app.get("/api/tmp/posts", (req, res) =>
  res.json([
    { id: "p1", title: "Post 1" },
    { id: "p2", title: "Post 2" },
  ])
);

app.listen(PORT, () => console.log(`Post API Server started PORT:${PORT}!`));
