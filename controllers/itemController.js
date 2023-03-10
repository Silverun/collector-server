const Item = require("../models/item");
const Comment = require("../models/comment");
const Like = require("../models/like");
const Collection = require("../models/collection");

const createItem = async (req, res) => {
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
  try {
    const result = await Item.findAll({
      where: { collectionId: collectionId },
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getCloudTags = async (req, res) => {
  try {
    const allItems = await Item.findAll();
    const allTags = [];
    allItems.forEach((item) => {
      item.tags.forEach((tag) => allTags.push(tag.label));
    });
    const result = {};
    allTags.forEach((tag) => (result[tag] = (result[tag] || 0) + 1));
    const endResult = [];
    for (const key in result) {
      endResult.push({
        value: key,
        count: result[key],
      });
    }
    res.status(200).send(endResult);
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

const getAllItems = async (req, res) => {
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

const getSearchItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    const searchItems = await Promise.all(
      items.map(async (item) => {
        const collection = await Collection.findOne({
          where: { id: item.collectionId },
        });
        const itemComments = await Comment.findAll({
          where: { itemId: item.id },
        });
        const formattedItemComments = itemComments.map(
          (comment) => comment.value
        );
        const formattedItemTags = item.tags.map((tag) => tag.label);
        const formattedItemFields = item.fieldsData.map((field) => field.value);

        const result = {
          id: item.id,
          name: item.name,
          tags: formattedItemTags,
          fieldsValues: formattedItemFields,
          colName: collection.name,
          colDesc: collection.description,
          colTheme: collection.theme,
          comments: formattedItemComments,
        };
        return result;
      })
    );

    res.status(200).send(searchItems);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  createItem,
  getCollectionItems,
  getItem,
  getAllItems,
  updateItem,
  addItemComment,
  getItemComments,
  addItemLike,
  removeItemLike,
  getItemLikes,
  deleteItem,
  getCloudTags,
  getSearchItems,
};
