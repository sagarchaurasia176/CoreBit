const bycrypt = require("bcrypt");
// schema import
const User = require("../model/Register.Schema");
exports.RegisterPage = async (req, res) => {
  try {
    const { name, email, phone, education, profilePic, password, role } =
      req.body;
    // Check if all required fields are provided
    if (
      !name ||
      !email ||
      !phone ||
      !education ||
      !profilePic ||
      !password ||
      !role
    ) {
      return res
        .status(400)
        .json({ success: false, msg: "Please fill in all fields" });
    }
    if (email) {
      return res
        .status(400)
        .json({ success: false, msg: "Please enter valid email" });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create the entry into the db
    const CreateEnteryIntoTheRegisterPage = await User.create({
      name,
      email,
      phone,
      education,
      profilePic,
      password: hashedPassword,
      role,
      createdAt,
    });
    // Send the resopnse  to the db
    res.status(201).json({
      success: true,
      msg: "User registered successfully!",
      CreateEnteryIntoTheRegisterPage,
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
