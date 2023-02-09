const express = require("express");
const passport = require("passport");
const router = express.Router();
const createUser = require("../controllers/user");
const loginUser = require("../controllers/user");

// const { user } = require("../controllers/index");
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("You are authorized to view page: " + req.params.id);
  }
);

router.post("/login", loginUser);

router.post("/register", createUser);

module.exports = router;
