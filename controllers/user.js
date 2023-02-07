const User = require("../models/user");

const createUser = async (req, res) => {
  if (req.body.username && req.body.password && req.body.email) {
    try {
      const result = await User.create({
        userName: req.body.username,
        userEmail: req.body.email,
        userPassword: req.body.password,
      });

      res.send("User created");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send("Something went wrong");
  }
};

module.exports = createUser;
