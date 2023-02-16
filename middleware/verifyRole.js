const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.role) return res.status(401).send("No req or roles found");
    const validRoles = [...allowedRoles];
    console.log(validRoles + " valid roles");
    console.log(req.role + " role of request");
    if (!validRoles.includes(req.role))
      return res
        .status(401)
        .send("You have no access to this resource or action");
    console.log("Role verification passed");
    next();
  };
};

module.exports = verifyRole;
