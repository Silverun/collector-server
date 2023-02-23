const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { SyncAllModels, SyncModel } = require("./models/index");
const userRoute = require("./routes/user");
const collectionRoute = require("./routes/collection");
const adminRoute = require("./routes/admin");
const refreshToken = require("./controllers/refreshTokenController");
const Collection = require("./models/collection");
const verifyJWT = require("./middleware/verifyJWT");
const verifyRole = require("./middleware/verifyRole");

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

app.use("/user", userRoute);
app.use("/collection", collectionRoute);
app.use("/admin", adminRoute);

const port = process.env.PORT;

app.get("/sync", async (req, res) => {
  await SyncAllModels();
  res.sendStatus(200);
});

app.get("/sync/collection", async (req, res) => {
  await Collection.sync({ alter: true });
  res.status(200).send("Collection synced");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
