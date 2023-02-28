const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Comment = sequelize.define("Comment", {
  value: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  byUserName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
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

module.exports = Comment;
