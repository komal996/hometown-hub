const mongoose = require("mongoose");

const hometownSchema = new mongoose.Schema({
  name: String,
  type: String,
  hometown: String
});

module.exports = mongoose.model("Hometown", hometownSchema);