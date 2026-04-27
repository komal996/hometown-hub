const express = require("express");
const router = express.Router();

const Hometown = require("../models/Hometown");

// POST - Save hometown
router.post("/", async (req, res) => {
  try {
    const { name, type, hometown } = req.body;

    const newData = new Hometown({ name, type, hometown });
    await newData.save();

    res.json({ message: "Hometown Saved Successfully ✅" });

  } catch (err) {
    res.status(500).json({ message: "Error saving data ❌" });
  }
});

module.exports = router;