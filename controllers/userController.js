const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (username && password && email) {
    try {
      const hashPass = await bcrypt.hash(password, 7);
      await User.create({
        userName: username,
        userEmail: email,
        userPassword: hashPass,
        userRole: 1,
      });

      res.status(200).send("User created.");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(400).send("Please fill in all the fields.");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const user = await User.findOne({
        where: { userEmail: email },
      });
      if (user) {
        if (await bcrypt.compare(password, user.userPassword)) {
          const payload = {
            id: user.id,
            email: user.userEmail,
            role: user.userRole,
          };
          const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          res.status(200).json({ message: "Logged in!", token: jwtToken });
        } else {
          res.status(403).send("Email or password does not match!");
        }
      } else {
        res.status(400).send("This user does not exist!");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(400).send("Please provide credentials");
  }
};

module.exports = {
  loginUser,
  createUser,
};
