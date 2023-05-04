const express=require('express');
const multer=require("multer");
const fs=require('fs');
const { createPost, getAllPost, getAllPostByFilter, getAllFilters, createComments, getAllComments } = require('../controller/post');
const router=express.Router();


const storage=multer.diskStorage({
    destination:function (req,file,cb) {
        if (!fs.existsSync("Upload")) {
            fs.mkdirSync("Upload")
        }
        if (file.originalname.split(".")[1]!="mp4") {
            if (!fs.existsSync("Upload/image")) {
                fs.mkdirSync("Upload/image")
            }
            cb(null,"Upload/image")
        } else {
            if (!fs.existsSync("Upload/video")) {
                fs.mkdirSync("Upload/video")
            }
            cb(null,"Upload/video")
        }
       
        
    },
    filename:function (req,file,cb) {
        cb(null,Date.now()+file.originalname)
    }
})
const Upload=multer({
    storage:storage
})
 
//  create post api
router.post("/create",Upload.fields([{
    name:"video",
    maxCount:1
},{
    name:"thumbnail",
    maxCount:1
}]),createPost);

//  get all post 
router.get("/getAllPost",getAllPost);

// get all post by type
router.post("/filter",getAllPostByFilter);

// get all filters
router.get("/filterList",getAllFilters);

// comment api by id
router.post("/comments",createComments);

//  get all comments by Post ID
router.post("/getComments",getAllComments);

module.exports=router;
