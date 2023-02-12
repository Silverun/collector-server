const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config;

const refreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).send("No cookies");
  const refreshToken = cookies.jwt;
  try {
    //find user with same ref token
    const user = await User.findOne({
      where: { refreshToken: refreshToken },
    });
    if (!user) return res.status(403).send("Not authorized");

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err || user.id !== decoded.id) return res.sendStatus(403);
      // changed here to match payload in user controller
      const payload = {
        id: decoded.id,
        username: decoded.username,
        role: decoded.role,
      };
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: 40,
      });
      // CHANGE ABOVE TO 15 min
      // HERE we are sending new access token to client
      res.json({ accessToken });
    });
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
};

module.exports = refreshToken;
