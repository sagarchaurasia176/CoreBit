const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/Register.Schema");
const cloudinary = require("cloudinary").v2;

// Cloudinary configuration
cloudinary.config({
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET_KEY,
  cloud_name: process.env.CLOUD_NAME,
});
// changeds

// Function to check if the file type is supported
const isFileSupported = (supportedFormats, fileType) => {
  return supportedFormats.includes(fileType.toLowerCase());
};

// Function to upload file to Cloudinary
const uploadToCloudinary = async (file, folder) => {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

// Registration logic
exports.RegisterPage = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // Check if the image file is provided
    const userImage = req.files?.UserImage;
    if (!userImage) {
      return res.status(400).json({
        success: false,
        message: "Image not uploaded",
      });
    }

    // Validate the image format
    const supportedFormats = ["png", "jpeg", "jpg"];
    const fileType = userImage.name.split(".").pop();
    if (!isFileSupported(supportedFormats, fileType)) {
      return res.status(400).json({
        success: false,
        message: "Unsupported image format",
      });
    }

    // Upload the image to Cloudinary
    const uploadedImage = await uploadToCloudinary(
      userImage,
      process.env.CLOUD_FOLDER
    );

    // Hash the password
    const salt = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user in the database
    const newUser = await User.create({
      name,
      email,
      Image: uploadedImage.url,
      password: hashedPassword,
      role,
    });

    // Generate JWT token
    const payload = {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    };

    const token = jwt.sign(payload, process.env.JW_SECRET_TOKEN, {
      expiresIn: "2d",
    });

    // Send the token as a cookie
    const cookieOptions = {
      httpOnly: true,
      sameSite: "Strict",
    };

    res
      .cookie("coreBits", token, cookieOptions)
      .status(201)
      .json({
        success: true,
        message: "User registered successfully",
        data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          imageUrl: newUser.Image,
          token,
        },
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred during registration, please try again.",
      error: error.message,
    });
  }
};

// user details
exports.getProfileDetails = async (req, res) => {
  try {
    const token =
      req.cookies.coreBits || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing",
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JW_SECRET_TOKEN);

    // Fetch user from the database
    const userProfile = await User.findById(decoded.id).select("-password");

    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    // Send user profile details
    res.status(200).json({
      success: true,
      message: "Profile details retrieved successfully",
      data: userProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching profile details",
      error: error.message,
    });
  }
};
