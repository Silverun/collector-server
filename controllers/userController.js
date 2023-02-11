const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SequelizeScopeError, ValidationError } = require("sequelize");
require("dotenv").config;

const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (username && password && email) {
    try {
      const hashPass = await bcrypt.hash(password, 7);

      const result = await User.create({
        userName: username,
        userEmail: email,
        userPassword: hashPass,
        userRole: 1,
        refreshToken: "none",
      });

      // res.status(200).send("User created");
      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(409).send("User with this email already exists");
      } else {
        res.status(400).send("User cannon be created");
      }
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
            username: user.userName,
            role: user.userRole,
          };
          // Create Tokens
          //Change access token to 5min later
          const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: 30,
          });
          const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            {
              expiresIn: "1d",
            }
          );
          // store refresh token in DB maybe hash it
          await user.update({ refreshToken: refreshToken });
          // send cookie with refresh token to client CHECK OPTIONS!!!
          res.cookie("jwt", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          res
            .status(200)
            .json({ message: "Logged in!", accessToken: accessToken });
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
