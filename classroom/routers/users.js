const express = require("express");
const router = express.Router();


router.get("/",(req,res)=>{
    res.send("get all users");
});

router.get("/:id",(req,res)=>{
    res.send("get particular users");
});

router.post("/",(req,res)=>{
    res.send("posting user details");
});

router.delete("/:id",(req,res)=>{
    res.send("deleting this particular user details");
});

module.exports = router;