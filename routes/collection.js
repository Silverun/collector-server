const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collectionController");
const multer = require("multer");
const upload = multer();
// Put protected routes

router.post(
  "/new",
  upload.single("image"),
  collectionController.createCollection
);

router.post(
  "/edit",
  upload.single("image"),
  collectionController.editCollection
);

router.post("/delete", collectionController.deleteCollection);

module.exports = router;
