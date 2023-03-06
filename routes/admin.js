const express = require("express");
const router = express.Router();
const verifyRole = require("../middleware/verifyRole");
const verifyJWT = require("../middleware/verifyJWT");
const adminController = require("../controllers/adminController");

router.use(verifyJWT, verifyRole(2));

router.get("/users", adminController.getAllUsers);

router.post("/delete", adminController.deleteUser);
router.post("/promote", adminController.promoteUser);
router.post("/demote", adminController.demoteUser);
router.post("/block", adminController.blockUser);
router.post("/unblock", adminController.unblockUser);

module.exports = router;
