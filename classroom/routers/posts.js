const express = require("express");
const router = express.Router();


router.get("/",(req,res)=>{
    res.send("get all posts");
});

router.get("/:id",(req,res)=>{
    res.send("get particular posts");
});

router.post("/",(req,res)=>{
    res.send("posting post details");
});

router.delete("/:id",(req,res)=>{
    res.send("deleting this particular post details");
});

module.exports = router;