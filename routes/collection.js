const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collectionController");
const multer = require("multer");
const upload = multer();
// Put protected routes

router.get("/getmycollection", (req, res) => {
  res.send("You are viewing collection " + req.params.id);
});

router.post(
  "/new",
  upload.single("image"),
  collectionController.createCollection
);

module.exports = router;
