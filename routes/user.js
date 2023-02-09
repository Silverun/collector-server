const express = require("express");
const router = express.Router();
const createUser = require("../controllers/user");
const loginUser = require("../controllers/user");

// const { user } = require("../controllers/index");

router.post("/login", loginUser);

router.post("/register", createUser);

module.exports = router;
