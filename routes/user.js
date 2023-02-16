const express = require("express");
// const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyRole = require("../middleware/verifyRole");
const verifyJWT = require("../middleware/verifyJWT");

// router.get(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.send("You are authorized to view page: " + req.params.id);
//   }
// );

// this one is protected by 30s

router.post("/login", userController.loginUser);
router.post("/register", userController.createUser, userController.loginUser);
router.get("/logout", userController.logoutUser);
// Check where verify goes
// verify JWT sets req to have
router.get("/:id", verifyJWT, verifyRole(1, 2), (req, res) => {
  res.send("Getting all your collections, user: " + req.params.id);
});

module.exports = router;