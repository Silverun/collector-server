const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { SyncAllModels } = require("./models/index");
const userRoute = require("./routes/user");
const collectionRoute = require("./routes/collection");
require("./middleware/passport");
// const { User } = require("./models/user");
// const sequelize = require("./models/index");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/collection", collectionRoute);

const port = process.env.PORT;

app.get("/sync", async (req, res) => {
  await SyncAllModels();
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
