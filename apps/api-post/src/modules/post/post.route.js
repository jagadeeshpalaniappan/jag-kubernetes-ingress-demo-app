const express = require("express");
const postCtrl = require("./post.ctrl");

const router = express.Router();

//Get All
router.get("/", postCtrl.getAll);

//Get One
router.get("/:id", postCtrl.getPost, postCtrl.getById);

//Create One
router.post("/", postCtrl.create);

//Patch One
router.patch("/:id", postCtrl.getPost, postCtrl.patch);

//Put One
router.put("/:id", postCtrl.getPost, postCtrl.update);

//Delete One
router.delete("/:id", postCtrl.getPost, postCtrl.delete);

module.exports = router;
