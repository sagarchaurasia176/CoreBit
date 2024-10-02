const bycrypt = require("bcrypt");
// schema import
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/Register.Schema");
const cloudinary = require("cloudinary").v2;
//cloudinary config
cloudinary.config({
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET_KEY,
  cloud_name: process.env.CLOUD_NAME,
});

//file support functions
const FileSupported = async (fileSupportFormat, fileType) => {
  return await fileSupportFormat.includes(fileType);
};
//uploaded to the server => cloud
const cloudUploader = async (file, folder) => {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

// Registered page
exports.RegisterPage = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //req file from the cloudinary
    const userImageForSendToTheServer = req.files.UserImage;

    if (!userImageForSendToTheServer) {
      console.error("Image not upload");
      return res.status(400).json({
        success: false,
        message: "File not uploaded succesfully from cloudinary !",
      });
    }

    // Check if all required fields are provided
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, msg: "Please fill all fields" });
    }
    // This goes to the db and check the data
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        success: false,
        msg: "Please enter valid email",
      });
    }

    const fileSupportFormat = ["png", "jpeg", "jpg"];
    const fileType = userImageForSendToTheServer.name
      .split(".")
      .pop()
      .toLowerCase();

    if (!FileSupported(fileSupportFormat, fileType)) {
      return res.json({
        message: false,
        success: "Image not supported",
      });
    }

    //to upload the file to the cloudinary
    const fileUpoadedToTheCloudinaryServer = await cloudUploader(
      userImageForSendToTheServer,
      process.env.CLOUD_FOLDER
    );
    // Hash the password
    const salt = await bycrypt.genSalt(6);
    const hashedPassword = await bycrypt.hash(password, salt);
    // jwt logic
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    //Jwt creating logics
    try {
      let token = await jwt.sign(payload, process.env.JW_SECRET_TOKEN, {
        expiresIn: "2d",
      });
      // user = user.toObject();
      user.token = token;
      user.password = undefined;

      const options = {
        httpOnly: true,
        sameSite: "Strict",
      };

      return res
        .cookie("coreBits", token, options)
        .status(200)
        .json({
          success: true,
          token: token,
          expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24), //one Day
          cookes: "cookies stored in register ",
          message: "Singup succesfully ",
        });
    } catch (er) {
      //Login done
      return res.status(404).json({
        success: false,
        msg: "Something went wrong while creating  jwt token",
        error: er.message,
      });
    }

    //create the entry into the db
    const CreateEnteryIntoTheRegisterPage = await User.create({
      name,
      email,
      Image: fileUpoadedToTheCloudinaryServer.url,
      password: hashedPassword,
      role,
    });

    // Send the resopnse  to the db
    return res.status(201).json({
      success: true,
      msg: "User registered successfully!",
      data: CreateEnteryIntoTheRegisterPage,
    });

    // error part applied there !
  } catch (er) {
    return res.status(500).json({
      success: false,
      msg: "Error while Registered kindly try again from backend side",
      error: er.message,
    });
  }
};
