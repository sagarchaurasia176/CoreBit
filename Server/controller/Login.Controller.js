// Import required modules
const User = require("../model/Register.Schema"); // Assuming a User model
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { message } = require("statuses");
require("dotenv").config();
// Login Controller Logic
exports.LoginController = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password, role } = req.body;
    // Check if all required fields are provided
    if (!email || !password || !role) {
    return res.json({ success: false, msg: "Please fill all fields" });
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
          expiresIn: "2d",
        });
        // user = user.toObject();
        user.token = token;
        user.password = undefined;

        //now token updated
        await User.findByIdAndUpdate(payload.id, {
          token: token,
          messag: "token updated",
        });

        const options = {
          httpOnly: false,
          sameSite: "none",
        };

        return res
          .cookie("coreBits", token, options)
          .status(200)
          .json({
            success: true,
            token: token,
            data: payload,
            role: user.role,
            expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24), //one Day
            cookes: "cookies stored ",
            message: "Login succesfully ",
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
