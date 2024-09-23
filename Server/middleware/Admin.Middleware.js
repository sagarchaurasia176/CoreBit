//create three middleware
require("dotenv").config();
const token_JSON = require("jsonwebtoken");

//Authentication
exports.AuthenticationMiddlewares = async (req, res, next) => {
  try {
    //destruct the token
    const token = await req.body.token || req.cookies.token;
    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Token not valid",
        error: er.message,
      });
    }
    // Jwt verify token applied there
    try {
      const jwtTokenVerify = await token_JSON.verify(
        token,
        process.env.JW_SECRET_TOKEN
      );
      //decoded here
      req.user = jwtTokenVerify;
      
    } catch (er) {
      return res.status(500).json({
        success: false,
        message: "Token not matched",
        error: er.message,
      });
    }
    next();

    //Then moved to the next
  } catch (er) {
    return res.status(500).json({
      success: false,
      message: "you're not authenticated users ",
      error: er.message,
    });
  }
};

//User
exports.UserMiddelwares = async (req, res, next) => {
  try {
    //User role
    if (req.user.role !== "User") {
      return res.status(300).json({
        success: false,
        message: "Protected routes for only access by the Users",
        error: er.message,
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
//Admin
exports.AdminMiddlewares = (role) => {
  return async (req, res, next) => {
    try {
      if (req.user.role !== "Admin") {
        return res.status(420).json({
          success: false,
          message: "Protected routes for only access by the Admin",
          error: er.message,
        });
      }
      next();
    } catch (er) {
      return res.status(404).json({
        success: false,
        message: "Access denied for User",
        error: er.message,
      });
    }
  };
};
