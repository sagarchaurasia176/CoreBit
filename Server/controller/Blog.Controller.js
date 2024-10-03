const mongoose = require("mongoose");
const Blogs = require("../model/Blog.Schema");
const User = require("../model/Register.Schema");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
//cloudinary config
cloudinary.config({
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET_KEY,
  cloud_name: process.env.CLOUD_NAME,
});

//Blog setup cloudinary part
const ImageSupportFormater = async (type, ImageSupported) => {
  return await ImageSupported.includes(type);
};
//UploaderSupport To cloud
const uploaderToCloud = async (file, folder) => {
  const folders = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, folders);
};

// Create Blog page here
exports.createBlog = async (req, res) => {
  try {
    const {  category, title, About } = req.body;

    // If not category , title , about
    if (!category || !title || !About) {
      return res.status(404).json({
        success: false,
        message: "Please fill the input filled",
      });
    }

    const createdBy = req?.user?.id;
    // Fetch the admin user details using the createdBy ID
    const adminUser = await User.findById(createdBy);

    if (!adminUser) {
      return res.status(404).json({ success: false, msg: "Admin not found" });
    }
    // const adminName = adminUser?.name;
    // const adminPhoto = adminUser?.Image;
    // console.log("Admin photo:", adminPhoto);
    // console.log("Admin name:", adminName);

    //This is for file Uploaded purposed
    const files = req.files.BlogImg;

    // Check if all required fields are provided
    if (!category || !title || !About) {
      return res
        .status(400)
        .json({ success: false, msg: "Please fill in all fields" });
    }

    const checkIfRemainDatas = await Blogs.findOne({ title });
    if (checkIfRemainDatas) {
      return res.status(404).json({
        success: false,
        msg: "This Titel has already created",
      });
    }

    //Cloudinary setup applied
    const ImageSupporter = ["png", "jpg", "jpeg"];
    //now set the extension
    const ImgExtension = files.name.split(".").pop().toLowerCase();

    if (!ImageSupportFormater(ImageSupporter, ImgExtension)) {
      return res.status(500).json({
        success: false,
        msg: "Img not supported",
        error: er.message,
      });
    }
    //upload to the cloud
    const BlogImgToTheCloud = await uploaderToCloud(
      files,
      process.env.CLOUD_FOLDER
    );

    //create the entry into the db
    const CreateEnteryIntoTheRegisterPage = await Blogs.create({
      title,
      category,
      About,
      // AdminName: adminName,
      // AdminPic: adminPhoto,
      createdBy,
      blogImg: BlogImgToTheCloud.url,
    });

    return res.status(201).json({
      success: true,
      msg: "Blog Created successfully!",
      data: CreateEnteryIntoTheRegisterPage,
    });
  } catch (er) {
    return res.status(500).json({
      success: false,
      msg: "Error while Posting the blog",
      error: er.message,
    });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    return res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (er) {
    return res.status(505).json({
      success: false,
      message: "error while fetching the blog post",
      error: er.message,
    });
  }
};

//single blog post
exports.SingleBlogPostWhatTheUsersCreated = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        msg: "This types of post in not created",
        error: er.message,
      });
    }
    const FindPostFromTheDb = await Blogs.findById(id);
    if (!FindPostFromTheDb) {
      return res.status(404).json({
        success: false,
        msg: "Somethings went wrong while finding your post",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Post is Deleted succesfully",
      data: FindPostFromTheDb,
    });
  } catch (er) {
    return res.status(500).json({
      success: false,
      message: "error while fetching the blog post",
      error: er.message,
    });
  }
};

// My blog which created by users
exports.MyBlogWhichCreatedByUsersOnly = async (req, res) => {
  try {
    const createdBy = req.user.id; // User ID of the logged-in user
    // Check if the user is an admin
    if (!User.role === "Admin") {
      return res.status(403).json({
        message: "Access denied. Only admins can view this data.",
      });
    }

    // Fetch blogs created by the user
    const myBlog = await Blogs.find({ createdBy });

    res.status(200).json({
      data: myBlog,
      message: "Blogs fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching blogs",
      error: error.message,
    });
  }
};

// DELETE CONTROLLER APPLIED THERE SO WE GET !
exports.deleteController = async (req, res) => {
  try {
    //take the id form user
    const { id } = req.params;
    if (!id) {
      return res.status(500).json({
        success: false,
        msg: "This types of post in not created",
        error: er.message,
      });
    }

    //delete the post
    const DeleteThePostFromTheDb = await Blogs.findByIdAndDelete({
      _id: id,
    });
    return res.status(200).json({
      success: true,
      msg: "Post is Deleted succesfully",
      data: DeleteThePostFromTheDb,
    });

    //return resp
  } catch (er) {
    return res.status(500).json({
      success: false,
      msg: "Error while deleting the post",
      error: er.message,
    });
  }
};

//update the blog
exports.updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const changeDataInBody = req.body;
    if (!id) {
      return res.status(404).json({
        success: false,
        msg: "Id not matched with the post",
        error: er.message,
      });
    }

    const updatedThePostFromTheDb = await Blogs.findByIdAndUpdate(
      id,
      changeDataInBody,
      { new: true }
    );
    return res.status(200).json({
      success: true,
      msg: "Post is updated succesfully",
      data: updatedThePostFromTheDb,
    });
  } catch (er) {
    return res.status(500).json({
      success: false,
      message: "Error while updating the post",
      error: er.message,
    });
  }
};
