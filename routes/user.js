const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyRole = require("../middleware/verifyRole");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/login", userController.loginUser);
router.post("/register", userController.createUser, userController.loginUser);
router.get("/logout", userController.logoutUser);
// Check where verify goes
// verify JWT sets req to have
router.get("/:id", verifyJWT, verifyRole(1, 2), (req, res) => {
  res.send("Getting all your collections, user: " + req.params.id);
});

module.exports = router;
