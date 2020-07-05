// @ts-nocheck
// require("dotenv").config();

const db = require("./db");
const express = require("./express");

async function main() {
  try {
    await db.init();
    express.init();
  } catch (err) {
    console.error(err);
  }
}

main();
