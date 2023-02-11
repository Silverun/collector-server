const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_SECRET,
  //   issuer: "accounts.examplesoft.com",
  //   audience: "yoursite.net",
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    User.findOne({ where: { id: jwtPayload.id } })
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);
