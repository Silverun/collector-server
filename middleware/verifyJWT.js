const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  // was const authHeader = req.headers["authorization"];
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).send("No Auth. Header");
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Invalid access token");
    // console.log(decoded.role, decoded.username + " sent after verifyJWT");
    req.role = decoded.role;
    req.user = decoded.username;
    // req.id = decoded.id

    next();
  });
};

module.exports = verifyJWT;
