const User = require("../models/user");

const deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.body } });
    res.status(200).send("Users deleted");
  } catch (error) {
    res.status(404).send(error);
  }
};
const promoteUser = async (req, res) => {
  try {
    await User.update({ userRole: 2 }, { where: { id: req.body } });
    res.send("Users promoted");
  } catch (error) {
    res.status(404).send(error);
  }
};
const demoteUser = async (req, res) => {
  try {
    await User.update({ userRole: 1 }, { where: { id: req.body } });
    res.send("Users demoted");
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  deleteUser,
  promoteUser,
  demoteUser,
};
