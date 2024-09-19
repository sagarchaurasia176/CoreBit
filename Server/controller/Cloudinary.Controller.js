const cloudinary = require("cloudinary").v2;
require("dotenv").config();
// Cloudinary config file setup applied 
cloudinary.config({
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET_KEY,
  cloud_name: process.env.CLOUD_NAME,
});
