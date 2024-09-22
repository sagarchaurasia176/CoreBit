// Log-Out method
exports.Logout = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      // You can also add 'secure: true' in production (for HTTPS)
    });

    // Send a success response
    return res.status(200).json({
      success: true,
      message: "You have logged out!",
    });

  } catch (er) {
    // Handle any potential errors
    return res.status(500).json({
      success: false,
      message: "Logout failed!",
      error: er.message,
    });
  }
};
