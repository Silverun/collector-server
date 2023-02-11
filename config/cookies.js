const cookiesOpts = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  //   secure: true,
  //   set this to true production
};

module.exports = cookiesOpts;
