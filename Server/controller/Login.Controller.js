// Import required modules
const User = require("../model/Register.Schema"); // Assuming a User model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

    // email veriified
    if (!user) {
      return res.json({ message: "Email Not matched" });
    }

    // 2. Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // jwt logic
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    try {
      if (isPasswordMatch) {
        const jwtToken = await jwt.sign(payload, process.env.JW_SECRET_TOKEN, {
          expiresIn: "1d",
        });
        if (!jwtToken) {
          return res.json({
            success: false,
            message: "token not generated",
          });
        }
        //want to hide the password
        user.token = jwtToken;
        user.password = undefined;

        //generate the cookies
        const options = {
          httpOnly: true,
          secure: true,
        };
        res.cookie("token", jwtToken, options).status(200).json({
          success: true,
          jwtToken,
          message: "cookies stored",
        });
      }
    } catch (er) {
      res.status(404).json({
        success: false,
        msg: "something went wrong in the token ",
      });
    }

    //Login done
    res.status(200).json({
      success: true,
      msg: "Login succesfully",
    });
  } catch (er) {
    res.status(500).json({
      message: "Server error",
      error: er.message,
    });
  }
};
