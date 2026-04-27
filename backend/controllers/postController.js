const { posts, notifications } = require("../data/store");

// Create Post
exports.createPost = (req, res) => {
  const { text, isAnnouncement } = req.body;

  const post = {
    id: Date.now(),
    text,
    isAnnouncement: isAnnouncement || false
  };

  posts.push(post);

  notifications.push({
    message: post.isAnnouncement
      ? "📢 New announcement created"
      : "📝 New post created"
  });

  res.send(post);
};

// Get Posts
exports.getPosts = (req, res) => {
  res.send(posts);
};

// Update Post
exports.updatePost = (req, res) => {
  const post = posts.find(p => p.id == req.params.id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  post.text = req.body.text;

  res.json({ message: "Post updated" });
};
// Delete Post
exports.deletePost = (req, res) => {
  const index = posts.findIndex(p => p.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  posts.splice(index, 1);

  res.json({ message: "Post deleted" });
};