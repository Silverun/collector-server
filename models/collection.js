const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Collection = sequelize.define("Collection", {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    // consider changing type
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  theme: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  extraFields: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: false,
    },
  },
  authorId: {
    type: DataTypes.INTEGER(),
    allowNull: false,
    validate: {
      notEmpty: false,
    },
  },
});

module.exports = Collection;
