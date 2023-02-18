const express = require("express");
const router = express.Router();

router.get("/getmycollection", (req, res) => {
  res.send("You are viewing collection " + req.params.id);
});
router.post("/collection/new", (req, res) => {});

module.exports = router;
