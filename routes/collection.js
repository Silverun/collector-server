const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collectionController");
const multer = require("multer");
const verifyJWT = require("../middleware/verifyJWT");
const upload = multer();
// Put protected routes

router.get("/getall", collectionController.getAllCollections);
router.get("/:col_id", collectionController.getSoloCollection);

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
