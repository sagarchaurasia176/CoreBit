// Import required modules
const User = require("../model/Register.Schema"); // Assuming a User model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Login Controller Logic
exports.LoginController = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password, role } = req.body;
    // Check if all required fields are provided
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, msg: "Please fill in all fields" });
    }
    let user = await User.findOne({ email });
    // email veriified
    if (!user) {
      return res.status(404).json({ message: "Email Not matched" });
    }

    // 2. Compare the provided password with the hashed password in the database
    let isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.json({ message: "Invalid password" });
    }

    if (user.role !== role) {
      return res.status(404).json({
        success: false,
        msg: `Give role ${role}not found `,
        error: er.message,
      });
    }

    // jwt logic
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    //Jwt creating logics
    try {
      if (isPasswordMatch) {
        //jwt createing
        let token = await jwt.sign(payload, process.env.JW_SECRET_TOKEN, {
          expiresIn: "1d",
        });
        // user = user.toObject();
        user.token = token;
        user.password = undefined;

        // Set cookie options
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };

        return res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          data: user._id,
          role: user.role,
          message: "Login succesfully done",
        });
      }
    } catch (er) {
      //Login done
      return res.status(404).json({
        success: false,
        msg: "Something went wrong while creating  jwt token",
        error: er.message,
      });
    }
  } catch (er) {
    return res.status(500).json({
      message: "Something went wrong while login , kindly try again it ",
      error: er.message,
    });
  }
};
