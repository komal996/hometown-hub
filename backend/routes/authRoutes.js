const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, city } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ name, email, password, city });
    await user.save();

    res.json({ message: "Registration successful ✅" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { user: { id: user._id } },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      msg: "Login successful",
      token
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;