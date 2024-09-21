// Log-Out method applied there so we get
const cookie = require("cookie");
exports.Logout = async (req, res) => {
  try {
    const cookiesLoggedOut = await res.clearCookie("userToken", {
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "You Logged out !",
      data: cookiesLoggedOut,
    });

    //Error parts
  } catch (er) {
    res.status(402).json({
      success: false,
      message: "You're not Logged out !",
      error: er.message,
    });
  }
};
