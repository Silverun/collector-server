const Item = require("../models/item");

const createItem = async (req, res) => {
  console.log(req.body);
  res.send("Created item!");
};

module.exports = {
  createItem,
};
