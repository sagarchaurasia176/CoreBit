require("dotenv").config();
const token_JSON = require("jsonwebtoken");

// Authentication Middleware
exports.AuthenticationMiddlewares = async (req, res, next) => {
  try {
    // Extract the token from Authorization header or body or cookie
    const tokens =req.body.token ||req.cookies.token ||req.header("Authorisation").replace("Bearer" , "");

    if (!tokens) {
      return res.status(401).json({
        success: false,
        message: "Token not valid",
      });
    }

    // Verify JWT token
    try {
      const jwtTokenVerify = await token_JSON.verify(
        tokens,
        process.env.JW_SECRET_TOKEN
      );
      req.user = jwtTokenVerify;
     
    } catch (er) {
      return res.status(500).json({
        success: false,
        message: "Token not matched",
        error: er.message,
      });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (er) {
    return res.status(500).json({
      success: false,
      message: "You're not authenticated",
      error: er.message,
    });
  }
};

// User Middleware
exports.UserMiddelwares = async (req, res, next) => {
  try {
    // Check if the user has the "User" role
    if (req.user.role !== "User") {
      return res.status(403).json({
        success: false,
        message: "Protected route, only accessible by Users",
      });
    }
    next();
  } catch (er) {
    return res.status(500).json({
      success: false,
      message: "Access denied for admin",
      error: er.message,
    });
  }
};

// Admin Middleware
exports.AdminMiddlewares = async(req, res, next) => {
    try {
      // Check if the user has the "Admin" role
      if (req.user.role !== "Admin") {
        return res.status(403).json({
          success: false,
          message: "Protected route, only accessible by Admin",
        });
      }
      next();
    } catch (er) {
      return res.status(500).json({
        success: false,
        message: "Access denied for User",
        error: er.message,
      });
    }
  };

