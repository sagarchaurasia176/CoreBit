const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogSchema = new Schema({
  //Blog modals
  category: {
    type: String,
    required: true,
  },
  //cloudinary Admin Image
  Image: {
    type: String,
  },

  title: {
    type: String,
    required: true,
  },
  blogImg: {
    type: String,
    required: true,
  },
  About: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  AdminName: {
    type: String,
  },

  AdminPic: {
    type: String,
  },
});

module.exports = mongoose.model("Blogs", BlogSchema);
