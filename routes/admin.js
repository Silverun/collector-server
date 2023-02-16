const express = require("express");
const router = express.Router();
const verifyRole = require("../middleware/verifyRole");
const verifyJWT = require("../middleware/verifyJWT");
const User = require("../models/user");

router.post("/delete", verifyJWT, verifyRole(2), (req, res) => {
  // get user id to delete from params or body
  res.send("User deleted");
});
// working just change values adn add validation
router.post("/promote", async (req, res) => {
  const user = await User.findOne({ where: { id: 2 } });
  await user.update({ userRole: 2 });
  res.send(`User promoted`);
});

router.get("/users", verifyJWT, verifyRole(2), async (req, res) => {
  try {
    const users = await User.findAll();
    // console.log(users);
    res.status(200).send({ users });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;