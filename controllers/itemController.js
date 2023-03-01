const Item = require("../models/item");
const Comment = require("../models/comment");
const Like = require("../models/like");
const Collection = require("../models/collection");

const createItem = async (req, res) => {
  try {
    const result = await Item.create(req.body);
    console.log("ITEM CREATED ID", result.id);
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

const deleteItem = async (req, res) => {
  try {
    const foundItem = await Item.findOne({ where: { id: req.params.item_id } });
    const itemComments = await Comment.findAll({
      where: { itemId: foundItem.id },
    });
    itemComments.forEach(async (comment) => await comment.destroy());
    await Item.destroy({
      where: { id: req.params.item_id },
    });
    res.status(200).send("Item deleted");
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

const getItemLikes = async (req, res) => {
  try {
    const result = await Like.findAll({
      where: { itemId: req.params.item_id },
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
};

const addItemLike = async (req, res) => {
  try {
    await Like.create(req.body);
    res.status(200).send("Like added");
  } catch (error) {
    res.status(404).send(error);
  }
};

const removeItemLike = async (req, res) => {
  try {
    await Like.destroy({
      where: { itemId: req.params.item_id, byUserId: req.params.user_id },
    });
    res.status(200).send("Removed like");
  } catch (error) {
    res.status(404).send(error);
  }
};

const addItemComment = async (req, res) => {
  try {
    await Comment.create(req.body);
    res.status(200).send("Comment created");
  } catch (error) {
    res.status(404).send(error);
  }
};
const getItemComments = async (req, res) => {
  try {
    const result = await Comment.findAll({
      where: { itemId: req.params.item_id },
    });
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
  addItemComment,
  getItemComments,
  addItemLike,
  removeItemLike,
  getItemLikes,
  deleteItem,
};
