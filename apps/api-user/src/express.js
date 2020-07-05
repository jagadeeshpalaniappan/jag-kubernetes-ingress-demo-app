const express = require("express");
const morganBody = require("morgan-body");
const userRouter = require("./modules/user/user.route");
const PORT = process.env.PORT || 80;

function init() {
  const app = express();

  // parse: req.body
  app.use(express.json());
  // log: req.body
  morganBody(app);

  // API:
  app.get("/health", (req, res) => res.json({ status: "RUNNING" }));
  app.use("/api/v1/users", userRouter);

  // LISTEN:
  app.listen(PORT, () => console.log(`AppServer Running in PORT:${PORT}!`));
}

module.exports = { init };
