const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const verifyRole = require("../middleware/verifyRole");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/tags", itemController.getAllTags);
// router.get("/likes", itemController.getAllLikes);
router.get("/:col_id", itemController.getCollectionItems);
router.get("/:item_id/getcomments", itemController.getItemComments);
router.get("/:item_id/getlikes", itemController.getItemLikes);
router.get("/:item_id/removelike/:user_id", itemController.removeItemLike);

router.post("/new", itemController.createItem);
router.post("/addcoment", itemController.addItemComment);
router.post("/addlike", itemController.addItemLike);
router.post("/:item_id/update", itemController.updateItem);
router.post("/:item_id/delete", itemController.deleteItem);
router.post("/:id", itemController.getItem);

// Check where verify goes
// verify JWT sets req to have

module.exports = router;
