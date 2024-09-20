// Import required modules
const User = require("../model/Register.Schema"); // Assuming a User model
const bcrypt = require('bcrypt');

const { CreateTokenWhileRegistered } = require("../Token/AuthenticationToken");
require("dotenv").config();

// Login Controller Logic
exports.LoginController = async (req, res) => {
  try {
    const { email, password, role } = req.body; // Get email and password from request body
    // Check if all required fields are provided
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, msg: "Please fill in all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email Not matched" });
    }

    // 2. Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    //jwt token
    const token = await CreateTokenWhileRegistered(user._id, res);
    res.status(200).json({
      success: true,
      msg: "Login succesfully",
      token: token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
