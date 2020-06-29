// @ts-nocheck
// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
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

app.use("/api/v1/posts", postRouter);
app.listen(PORT, () => console.log(`Post API Server started PORT:${PORT}!`));
