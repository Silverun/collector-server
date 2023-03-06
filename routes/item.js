const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const verifyRole = require("../middleware/verifyRole");
const verifyJWT = require("../middleware/verifyJWT");
const verifyStatus = require("../middleware/verifyStatus");

router.get("/getall", itemController.getAllItems);
router.get("/gettags", itemController.getCloudTags);
router.get("/getsearchitems", itemController.getSearchItems);

router.get("/:col_id", itemController.getCollectionItems);
router.get("/:item_id/getcomments", itemController.getItemComments);
router.get("/:item_id/getlikes", itemController.getItemLikes);

router.get(
  "/:item_id/removelike/:user_id",
  verifyJWT,
  verifyRole(1, 2),
  itemController.removeItemLike
);
router.post("/new", verifyJWT, verifyRole(1, 2), itemController.createItem);
router.post(
  "/addcoment",
  verifyJWT,
  verifyRole(1, 2),
  itemController.addItemComment
);
router.post(
  "/addlike",
  verifyJWT,
  verifyRole(1, 2),
  itemController.addItemLike
);
router.post(
  "/:item_id/update",
  verifyJWT,
  verifyRole(1, 2),
  itemController.updateItem
);
router.post(
  "/:item_id/delete",
  verifyJWT,
  verifyRole(1, 2),
  itemController.deleteItem
);
router.post("/:id", itemController.getItem);

module.exports = router;
