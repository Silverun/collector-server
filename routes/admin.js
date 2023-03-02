const express = require("express");
const router = express.Router();
const verifyRole = require("../middleware/verifyRole");
const verifyJWT = require("../middleware/verifyJWT");
const User = require("../models/user");
const adminController = require("../controllers/adminController");

router.get("/users", verifyJWT, verifyRole(2), adminController.getAllUsers);

router.post("/delete", verifyJWT, verifyRole(2), adminController.deleteUser);
router.post("/promote", adminController.promoteUser);
router.post("/demote", adminController.demoteUser);
router.post("/block", adminController.blockUser);
router.post("/unblock", adminController.unblockUser);

module.exports = router;
