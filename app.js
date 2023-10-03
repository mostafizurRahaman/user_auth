const express = require("express");
const cors = require("cors");

//  require routes:
const userRouter = require("./routes/user.route");

//  app:
const app = express();

//   middleware:
app.use(cors());
app.use(express.json());

//  use routes:
app.use("/api/v1/user", userRouter);

module.exports = app;
