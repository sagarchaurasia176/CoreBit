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
  },
  blogImg: {
    type: String,
  },
  About: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  AdminName: {
    type: String,
  },

  AdminPic: {
    type: String,
  },
});

module.exports = mongoose.model("Blogs", BlogSchema);
