const express = require("express");
const router = express.Router();

router.get("/stats",(req,res)=>{

res.json({
users:120,
posts:45,
communities:8
});

});

module.exports = router;