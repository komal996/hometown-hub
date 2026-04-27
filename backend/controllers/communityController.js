const Community = require("../models/Community");

// CREATE or JOIN
exports.handleCommunity = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Community name required" });
    }

    let community = await Community.findOne({ name });

    // 👉 If exists → JOIN
    if (community) {

      if (!community.members.includes(req.user.id)) {
        community.members.push(req.user.id);
        await community.save();
      }

      return res.json({ message: "Joined community successfully ✅" });
    }

    // 👉 If not exists → CREATE
    community = new Community({
      name,
      members: [req.user.id]
    });

    await community.save();

    res.json({ message: "Community created successfully ✅" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
};