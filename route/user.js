const express=require('express');
const multer=require("multer");
const fs=require('fs');
const { resisterUser, LoginUser } = require('../controller/user');
const router=express.Router();


const storage=multer.diskStorage({
    destination:function (req,file,cb) {
        if (!fs.existsSync("Upload")) {
            fs.mkdirSync("Upload")
        }
        if (!fs.existsSync("Upload/image")) {
            fs.mkdirSync("Upload/image")
        }
        cb(null,"Upload/image")
    },
    filename:function (req,file,cb) {
        cb(null,Date.now()+file.originalname)
    }
})
const Upload=multer({
    storage:storage
})

// login api 
router.post("/login",LoginUser)
//  resister api
router.post("/resister",Upload.fields([{
    name:"image",
    maxCount:1
}]),resisterUser);

module.exports=router;
