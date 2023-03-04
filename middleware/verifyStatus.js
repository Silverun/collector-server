const User = require("../models/user");
const userController = require("../controllers/userController");

const verifyStatus = async (req, res, next) => {
  const userId = req.query.userid;
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (user.userStatus === "blocked") {
      res.status(401).send("This user is blocked");
      return;
    }
  } catch (error) {
    res
      .status(404)
      .send({ message: "Error during status verification", error: error });
  }
  next();
};

module.exports = verifyStatus;
