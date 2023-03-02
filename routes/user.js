const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyRole = require("../middleware/verifyRole");
const verifyJWT = require("../middleware/verifyJWT");
const verifyStatus = require("../middleware/verifyStatus");

router.post("/login", userController.loginUser);
router.post("/register", userController.createUser, userController.loginUser);
router.post("/checkblocked", userController.checkBlocked);

router.get("/logout", userController.logoutUser);
// Check where verify goes
// verify JWT sets req to have
router.get(
  "/:id",
  verifyJWT,
  verifyRole(1, 2),
  verifyStatus,
  userController.getUserCollections
);

module.exports = router;
