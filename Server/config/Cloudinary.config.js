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
    res.status(200).json({
      success: true,
      message: "Media Uploaded succesfully !",
    });
  } catch (er) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while send the media to the cloud",
      error: er.message,
    });
  }
};
module.exports = cloudinaryConfigFunction;