const mongoose = require("mongoose");
require('dotenv').config()
const mongoDb = () => {
  mongoose
    .connect(process.env.MONOGo_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("db running succesfully");
    })
    .catch((er) => {
      console.log("error at db connections");
    });
};
module.exports = mongoDb;
