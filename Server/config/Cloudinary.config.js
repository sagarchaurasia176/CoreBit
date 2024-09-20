const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// CLoudinary config
const cloudinaryConfigFunction = (req, res) => {
  try {
    cloudinary.config({
      api_key: process.env.CLOUD_API,
      api_secret: process.env.CLOUD_SECRET_KEY,
      cloud_name: process.env.CLOUD_NAME,
    });
  } catch (er) {
    console.log("error at cloudinary config file" , er);

  }
};
module.exports = cloudinaryConfigFunction;