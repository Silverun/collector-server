const express = require("express");
const router = express.Router();
const verifyRole = require("../middleware/verifyRole");
const verifyJWT = require("../middleware/verifyJWT");
const User = require("../models/user");
const adminController = require("../controllers/adminController");

router.post("/delete", verifyJWT, verifyRole(2), adminController.deleteUser);
router.post("/promote", adminController.promoteUser);
router.post("/demote", adminController.demoteUser);

router.get("/users", verifyJWT, verifyRole(2), async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
