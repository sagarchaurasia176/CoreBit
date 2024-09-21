const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

// Define User Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validator: [validator.isEmail, "Please enter a valid email"],
    unique: true, // Ensure email is unique
  },

  Image: {
    type: String,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the User Model
const User = mongoose.model("user", userSchema);

module.exports = User;
