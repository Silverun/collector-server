const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { SyncAllModels } = require("./models/index");
const userRoute = require("./routes/user");
const collectionRoute = require("./routes/collection");
const itemRoute = require("./routes/item");
const adminRoute = require("./routes/admin");
const refreshToken = require("./controllers/refreshTokenController");
const Collection = require("./models/collection");
const Item = require("./models/item");
const Like = require("./models/like");
const User = require("./models/user");
const verifyJWT = require("./middleware/verifyJWT");
const verifyRole = require("./middleware/verifyRole");
const verifyStatus = require("./middleware/verifyStatus");
const Comment = require("./models/comment");

const app = express();
//maybe user config approach to set separate function options for cors but this works
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//maybe change route? protected?
app.get("/refresh", refreshToken);
//app.use(verifyJWT) for all router below that are not public
// app.use(verifyStatus);
app.use("/user", userRoute);
app.use("/collection", collectionRoute);
app.use("/item", itemRoute);
app.use("/admin", adminRoute);

const port = process.env.PORT;

// Remove these after
app.get("/sync", async (req, res) => {
  await SyncAllModels();
  res.sendStatus(200);
});

app.get("/sync/collection", async (req, res) => {
  await Collection.sync({ alter: true });
  res.status(200).send("Collection synced");
});

app.get("/sync/user", async (req, res) => {
  await User.sync({ alter: true });
  res.status(200).send("User synced");
});

app.get("/sync/item", async (req, res) => {
  try {
    await Item.sync({ alter: true });
    res.status(200).send("Item synced");
  } catch (error) {
    res.status(404).send(error);
  }
});
app.get("/sync/comment", async (req, res) => {
  try {
    await Comment.sync({ alter: true });
    res.status(200).send("Comment synced");
  } catch (error) {
    res.status(404).send(error);
  }
});
app.get("/sync/like", async (req, res) => {
  try {
    await Like.sync({ alter: true });
    res.status(200).send("Like synced");
  } catch (error) {
    res.status(404).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
