const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: String,
  type: {
    type: String,
    enum: ["event", "post", "announcement"],
    default: "event"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Notification", notificationSchema);