const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const User = sequelize.define("User", {
  userName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userEmail: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  userPassword: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
// ADD ROLES
// hashed string length?

module.exports = User;
