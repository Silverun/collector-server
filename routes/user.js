const express = require("express");
const createUser = require("../controllers/user");
const router = express.Router();
// const { user } = require("../controllers/index");

router.get("/login", (req, res) => {
  res.send("Login");
});

router.post("/register", createUser);

module.exports = router;
