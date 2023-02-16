const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { SyncAllModels } = require("./models/index");
const userRoute = require("./routes/user");
const collectionRoute = require("./routes/collection");
const adminRoute = require("./routes/admin");
const refreshToken = require("./controllers/refreshTokenController");
// require("./middleware/passport");
// const { User } = require("./models/user");
// const sequelize = require("./models/index");

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
