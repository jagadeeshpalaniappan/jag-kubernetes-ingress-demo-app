const express = require("express");
const photoCtrl = require("./photo.ctrl");

const router = express.Router();

//Get All
router.get("/", photoCtrl.getAll);

//Get One
router.get("/:id", photoCtrl.getPhoto, photoCtrl.getById);

//Create One
router.post("/", photoCtrl.create);

//Patch One
router.patch("/:id", photoCtrl.getPhoto, photoCtrl.patch);

//Put One
router.put("/:id", photoCtrl.getPhoto, photoCtrl.update);

//Delete One
router.delete("/:id", photoCtrl.getPhoto, photoCtrl.delete);

module.exports = router;
