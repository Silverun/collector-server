const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Item = sequelize.define("Item", {
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  tags: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fieldsData: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  collectionId: {
    type: DataTypes.INTEGER(),
    allowNull: false,
    validate: {
      notEmpty: true,
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

module.exports = Item;
