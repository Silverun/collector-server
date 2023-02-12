const cookiesOpts = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  //   secure: true,
  // samesite? none? or defailt lax
  //   set this to true production
};

module.exports = cookiesOpts;
