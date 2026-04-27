const express = require("express");
const router = express.Router();
const { handleCommunity } = require("../controllers/communityController");
const auth = require('../middleware/auth'); 
router.post("/", auth, handleCommunity);

module.exports = router;