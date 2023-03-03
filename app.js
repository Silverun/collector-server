const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const collectionRoute = require("./routes/collection");
const itemRoute = require("./routes/item");
const adminRoute = require("./routes/admin");
const refreshToken = require("./controllers/refreshTokenController");
const verifyJWT = require("./middleware/verifyJWT");
const verifyRole = require("./middleware/verifyRole");
const verifyStatus = require("./middleware/verifyStatus");

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/refresh", refreshToken);

app.use("/user", userRoute);
app.use("/collection", collectionRoute);
app.use("/item", itemRoute);
app.use("/admin", adminRoute);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
