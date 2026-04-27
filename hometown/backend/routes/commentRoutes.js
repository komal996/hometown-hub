const express = require("express");
const router = express.Router();

router.post("/comment", (req, res) => {
    const { postId, userId, comment } = req.body;

    res.json({
        message: "Comment added successfully",
        postId,
        userId,
        comment
    });
});

module.exports = router;