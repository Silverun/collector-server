const Item = require("../models/item");

const createItem = async (req, res) => {
  //   console.log(req.body);

  try {
    await Item.create(req.body);
    res.status(200).send("Item created");
  } catch (error) {
    res.status(404).send(error);
  }
};

const updateItem = async (req, res) => {
  try {
    await Item.update(req.body, { where: { id: req.params.item_id } });
    res.status(200).send("Item updated");
  } catch (error) {
    res.status(404).send(error);
  }
};

const getCollectionItems = async (req, res) => {
  const collectionId = req.params.col_id;
  // console.log(req.params.col_id);
  try {
    const result = await Item.findAll({
      where: { collectionId: collectionId },
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getItem = async (req, res) => {
  try {
    const result = await Item.findOne({ where: { id: req.params.id } });
    res.send(result);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getAllTags = async (req, res) => {
  try {
    const result = await Item.findAll();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  createItem,
  getCollectionItems,
  getItem,
  getAllTags,
  updateItem,
};
