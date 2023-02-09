const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  //hash password
  // add role
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const user = await User.findOne({
        where: { userEmail: email },
      });
      if (user) {
        // check bcrypt.compare(mypass, dbpass, (err,result) => result == true)
        if (user.userPassword === password) {
          // do sent to front
          const payload = { id: user.id, email: user.userEmail };
          const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          res.status(200).json({ token: jwtToken });
        } else {
          res.status(403).send("Email or password does not match!");
        }
      } else {
        res.status(400).send("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(400).send("Please provide credentials");
  }
};

module.exports = createUser;
module.exports = loginUser;
