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
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userRole: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  refreshToken: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: false,
    },
  },
  userStatus: {
    type: DataTypes.STRING(255),
    defaultValue: "active",
    allowNull: false,
    validate: {
      notEmpty: false,
    },
  },
});

module.exports = User;
