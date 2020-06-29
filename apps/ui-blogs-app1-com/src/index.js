// require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// app.use(express.json());
app.get("/blogs", (req, res) => res.send("Blogs Page"));
app.get("/", (req, res) => res.send("Welcome to Jag's Blogs Home Page"));
app.listen(PORT, () => console.log(`User API Server started PORT:${PORT}!`));
