const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.role) return res.status(401).send("No req or roles found");
    const validRoles = [...allowedRoles];
    if (!validRoles.includes(req.role))
      return res
        .status(401)
        .send("You have no access to this resource or action");
    console.log("Verify role ran");
    next();
  };
};

module.exports = verifyRole;
