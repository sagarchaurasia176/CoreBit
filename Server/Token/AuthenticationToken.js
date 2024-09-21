require("dotenv").config();
const jsonWebToken = require("jsonwebtoken");
const user = require("../model/Register.Schema");

// Json web token applied there so we get !
exports.CreateTokenWhileRegistered = async (userId, res) => {
  try {
    // JW_SECRET_TOKEN
    const jwtToken = await jsonWebToken.sign(
      { userId },
      process.env.JW_SECRET_TOKEN,
      {
        expiresIn: "1d",
      }
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    //cookies applied there
    res.cookie("userToken", jwtToken, options);
    //save it into the db
    await user.findByIdAndUpdate(userId, { jwtToken });
    return jwtToken;
  } catch (er) {
    return res.status(402).json({
      success: false,
      message: "Token Not created ",
      error: er.message,
    });
  }
};
