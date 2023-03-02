const User = require("../models/user");
const userController = require("../controllers/userController");

const verifyStatus = async (req, res, next) => {
  const userId = req.query.userid;
  console.log(userId);
  try {
    const user = await User.findOne({ where: { id: userId } });

    if (user.userStatus === "blocked") {
      console.log("BLOCK");
      // await userController.logoutUser();
      return res.status(401).send("This user is blocked");
    }
  } catch (error) {
    res
      .status(404)
      .send({ message: "Error during status verification", error: error });
  }
  console.log("Status ok");
  next();
};

module.exports = verifyStatus;
