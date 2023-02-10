const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/userController");

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("You are authorized to view page: " + req.params.id);
  }
);

router.post("/login", userController.loginUser);
router.post("/register", userController.createUser);

module.exports = router;
