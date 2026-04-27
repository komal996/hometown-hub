const Notification = require("../models/Notification");
const Post = require("../models/Post");
const Comment = require("../models/Comment"); // ⚠️ Make sure this is added

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.postId;

    // ✅ Find post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // ✅ Save comment
    const comment = await Comment.create({
      text,
      user: req.user.id,
      post: postId,
    });

    // 🔔 Create notification (ONLY if not self)
    if (post.user.toString() !== req.user.id) {
      await Notification.create({
        user: post.user,
        type: "comment", // optional but good
        message: "Someone commented on your post",
        post: postId,
      });
    }

    res.json(comment);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};