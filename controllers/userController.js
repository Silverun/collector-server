const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SequelizeScopeError, ValidationError } = require("sequelize");
const cookiesOpts = require("../config/cookies");
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
            expiresIn: 40,
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
          res.cookie("jwt", refreshToken, cookiesOpts);
          res
            .status(200)
            .json({ message: "Logged in!", accessToken: accessToken });
          // accessToken goes to client
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

const logoutUser = async (req, res) => {
  // on client also delete teh access Token
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(204).send("No one to logout");
  const refreshToken = cookies.jwt;
  try {
    //find user with same ref token
    const user = await User.findOne({
      where: { refreshToken: refreshToken },
    });
    if (!user) {
      // CHECK COOKIE BEFORE DEPLOY
      res.clearCookie("jwt", cookiesOpts);

      return res.status(204).send("Cookie cleared");
    }
    //delete ref token in db
    await user.update({ refreshToken: "none" });
    // CHECK OPTIONS ---- add secure: true
    res.clearCookie("jwt", cookiesOpts);
    res.status(204).send("User logged out, token and cookie cleared");
  } catch (error) {
    res.status(400).send("Something went wrong during logout");
  }
};

module.exports = {
  loginUser,
  createUser,
  logoutUser,
};
