const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const verifyRole = require("../middleware/verifyRole");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/:col_id", itemController.getCollectionItems);

router.post("/new", itemController.createItem);
router.post("/:id", itemController.getItem);
router.post("/newtag", itemController.createTag);

// Check where verify goes
// verify JWT sets req to have

module.exports = router;
