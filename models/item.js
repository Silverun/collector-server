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
    get() {
      const rawValue = this.getDataValue("tags");
      return JSON.parse(rawValue);
    },
  },
  fieldsData: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    get() {
      const rawValue = this.getDataValue("fieldsData");
      return JSON.parse(rawValue);
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
