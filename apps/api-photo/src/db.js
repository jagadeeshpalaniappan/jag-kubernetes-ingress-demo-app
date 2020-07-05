const mongoose = require("mongoose");
const DATABASE_URL = process.env.DATABASE_URL;

function init() {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on("connected", () => {
      const dbStatus = { status: "DB_CONNECTION_SUCCESS", DATABASE_URL };
      console.log(dbStatus);
      resolve(dbStatus);
    });
    db.on("error", (dbErr) => {
      const dbStatus = { status: "DB_CONNECTION_FAILED", DATABASE_URL, dbErr };
      console.error(dbStatus);
      reject(dbStatus);
    });
  });
}

module.exports = { init };
