const cookiesOpts = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  secure: true,
  samesite: none,
  //   secure: true,
  // samesite? none? or defailt lax
};

module.exports = cookiesOpts;
