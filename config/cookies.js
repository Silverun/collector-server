const cookiesOpts = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  secure: true,
  sameSite: "None",
  domain: ".colltest.herokuapp.com",
};

module.exports = cookiesOpts;
