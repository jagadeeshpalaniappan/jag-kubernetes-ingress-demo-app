// require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// app.use(express.json());
app.get("/photos", (req, res) => res.send("Photos Page"));
app.get("/", (req, res) => res.send("Welcome to Jag's Photos Home Page"));
app.listen(PORT, () => console.log(`User API Server started PORT:${PORT}!`));
