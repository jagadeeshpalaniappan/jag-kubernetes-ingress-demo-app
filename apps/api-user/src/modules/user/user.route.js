const express = require("express");
const userCtrl = require("./user.ctrl");

const router = express.Router();

//Get All
router.get("/", userCtrl.getAll);

//Get One
router.get("/:id", userCtrl.getUser, userCtrl.getById);

//Create One
router.post("/", userCtrl.create);

//Patch One
router.patch("/:id", userCtrl.getUser, userCtrl.patch);

//Put One
router.put("/:id", userCtrl.getUser, userCtrl.update);

//Delete One
router.delete("/:id", userCtrl.getUser, userCtrl.delete);

module.exports = router;
