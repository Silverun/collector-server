const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { SyncAllModels } = require("./models/index");
const userRoute = require("./routes/user");
// const { User } = require("./models/user");
// const sequelize = require("./models/index");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoute);

const port = process.env.PORT;

app.get("/", async (req, res) => {
  await SyncAllModels();
  //   await User.sync();
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
