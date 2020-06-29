// require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 80;

app.get("/api/auth", (req, res) => {
  console.log("auth-api:start");
  const userToken = req.get("authorization");
  // TODO: Implement Auth
  if (userToken === "USERTOKEN") {
    console.log("auth-api:success");
    res.json({ ok: true, userToken, appToken: "APPTOKEN" });
  } else {
    console.log("auth-api:err");
    res.status(403).json({ ok: false });
  }
});

app.listen(PORT, () => console.log(`Photo API Server started PORT:${PORT}!`));
