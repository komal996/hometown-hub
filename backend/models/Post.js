const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  text: String,
  isAnnouncement: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);