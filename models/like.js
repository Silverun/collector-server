const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Like = sequelize.define("Like", {
  byUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Like;
