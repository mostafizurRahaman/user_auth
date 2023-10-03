const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();

//  require app:
const app = require("./app");

//  port:
const port = process.env.PORT || 8080;

mongoose.connect(process.env.DATABASE).then(() => {
   console.log(`Database connected Successfully`.blue.bold);
});

app.get("/", (req, res, next) => {
   res.status(200).send("Server is running now");
});

app.listen(port, () => {
   console.log(`server is running now `.green.bold);
});

process.on("unhandledRejection", (err) => {
   console.log(err.message, err.name);
   mongoose.connection
      .close()
      .then(() => {
         process.exit(1);
      })
      .catch((err) => {
         console.log("mongoose connection failed", err);
         process.exit(1);
      });
});
