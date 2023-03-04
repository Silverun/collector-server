const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config;

const refreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).send("No cookies");
  const refreshToken = cookies.jwt;
  try {
    const user = await User.findOne({
      where: { refreshToken: refreshToken },
    });
    if (!user)
      return res
        .status(403)
        .send("Not authorized, no user user with matching ref token found");

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err || user.id !== decoded.id)
        return res.status(403).send("Ref token verification failed");
      const payload = {
        id: decoded.id,
        username: decoded.username,
        role: decoded.role,
      };
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: 600,
      });
      res.json({
        accessToken,
        role: decoded.role,
        id: decoded.id,
        username: decoded.username,
      });
    });
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
};

module.exports = refreshToken;
