const bycrypt = require("bcrypt");
// schema import
const User = require("../model/Register.Schema");
const { CreateTokenWhileRegistered } = require("../Token/AuthenticationToken");
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
      return res.status(500).json({
        uccess: false,
        msg: "File not uploaded succesfully !",
      });
    }

    // Check if all required fields are provided
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, msg: "Please fill in all fields" });
    }
    // This goes to the db and check the data
    const checkAdditionalDetailInDb = await User.findOne({ email });

    if (checkAdditionalDetailInDb) {
      return res.status(400).json({
        success: false,
        msg: "Please enter valid email,already registered",
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
    //create the entry into the db
    const CreateEnteryIntoTheRegisterPage = await User.create({
      name,
      email,
      Image: fileUpoadedToTheCloudinaryServer.url,
      password: hashedPassword,
      role,
    });

    //Token creation 
      const token = await CreateTokenWhileRegistered(CreateEnteryIntoTheRegisterPage.__id , res);
      console.log("this is token",token)
    // Send the resopnse  to the db
    res.status(201).json({
      success: true,
      msg: "User registered successfully!",
      token : token,
      CreateEnteryIntoTheRegisterPage
    });

    // error part applied there !
  } catch (er) {
    res.status(500).json({
      success: false,
      msg: "Error while Registered kindly try again",
      error: er.message,
    });
  }
};
