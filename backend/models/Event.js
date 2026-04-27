const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  joinedUsers: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Event", eventSchema);