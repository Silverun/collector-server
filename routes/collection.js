const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collectionController");
// Put protected routes
router.get("/getmycollection", (req, res) => {
  res.send("You are viewing collection " + req.params.id);
});

router.post("/new", collectionController.createCollection);

module.exports = router;
