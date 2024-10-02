const express = require("express");
const BlogRouter = express.Router();

// All routes for blog crud operations
const {
  createBlog,
  deleteController,
  getAllBlogs,
  SingleBlogPostWhatTheUsersCreated,
  MyBlogWhichCreatedByUsersOnly,
  updateBlogPost,
} = require("../controller/Blog.Controller");

// Authentication Middleware
const {
  AuthenticationMiddlewares,
  AdminMiddlewares,
  UserMiddelwares,
} = require("../middleware/Admin.Middleware");

// Rergisteration pages applied there so we get
const { RegisterPage, getProfileDetails } = require("../controller/Register.Controller");
const { LoginController } = require("../controller/Login.Controller");
const { Logout } = require("../controller/Logout.Controller");

// RegisterationPage Routes
BlogRouter.post("/RegisterPage", RegisterPage);
BlogRouter.post("/LoginPage", LoginController);
BlogRouter.get("/LoggedOut", AuthenticationMiddlewares, Logout);

// Middleware
BlogRouter.post("/api/auth", AuthenticationMiddlewares, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Authentication done",
  });
});
// Middleware
BlogRouter.post(
  "/api/user",
  AuthenticationMiddlewares,
  UserMiddelwares,
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Welcome to student routes",
    });
  }
);
BlogRouter.post("/api/admin",
  AuthenticationMiddlewares,
  AdminMiddlewares,
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Welcome to Admin page",
    });
  }
);

//create blog
BlogRouter.post(
  "/createBlog",
  AuthenticationMiddlewares,
  AdminMiddlewares,
  createBlog
);
//get blog
BlogRouter.get("/Blog",getAllBlogs);

//single blog
BlogRouter.get(
  "/Single-post-data/:id",
  AuthenticationMiddlewares,
  SingleBlogPostWhatTheUsersCreated
);

//delete blog
BlogRouter.delete(
  "/Delete/:id",
  AuthenticationMiddlewares,
  AdminMiddlewares,
  deleteController
);

//updat
BlogRouter.put(
  "/update-post/:id",
  AuthenticationMiddlewares,
  AdminMiddlewares,
  updateBlogPost
);
//My-blogs
BlogRouter.get("/myBlogs",
  AuthenticationMiddlewares,
  AdminMiddlewares,
  MyBlogWhichCreatedByUsersOnly
);


BlogRouter.get('/profileDetails',AuthenticationMiddlewares , getProfileDetails);

module.exports = BlogRouter;
