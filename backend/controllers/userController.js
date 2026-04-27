const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, hometown } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      hometown
    });

    const savedUser = await user.save();

    const { password: _, ...userData } = savedUser.toObject();

    res.status(201).json({
      success: true,
      message: "Registered Successfully",
      user: userData
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};