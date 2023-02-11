const express = require("express");
const router = express.Router();

router.get("/getmycollection", (req, res) => {
  res.send("You are viewing collection " + req.params.id);
});

module.exports = router;
