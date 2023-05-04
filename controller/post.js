const postModel=require("../model/post");
const postTypeModel=require("../model/postType");
const mongoose=require('mongoose')
exports.createPost=async(req,res)=>{
try {
    console.log(req.body);
    
    const result=await postModel.create({
        userId:req.body.userId,
        postTitle:req.body.postTitle,
        postSubTitle:req.body.postSubTitle,
        like:[],
        thumbnail:req.files.thumbnail[0].path,
        video:req.files.video[0].path,
        comments:[],
        description:req.body.description,
        typeId:req.body.typeId
    });
    if (!result) {
        return res.json({
         data:null,
         code:"0000",
         message:"Post is not created successfully"
        }) 
     }
 
     return res.json({
         data:null,
         code:"1111",
         message:"Post uploaded successfully"
     })
    
} catch (error) {
    return res.json({
        data:null,
        code:"0000",
        systemIssue:error,
        message:"service is down"
    })
}
}

exports.getAllPost=async(req,res)=>{
    try {
        const result= await postModel.find()
        if (!result) {
            return res.json({
             data:null,
             code:"0000",
             message:"something went worng please check in post service"
            }) 
         }
        return res.json({
            data:result,
            code:"1111",
            message:"get all post"
        })
    } catch (error) {
        return res.json({
            data:null,
            code:"0000",
            systemIssue:error,
            message:"service is down"
        })
    }

}
exports.getAllPostByFilter=async(req,res)=>{
    try {
        console.log(req.body);
        const result= await postModel.find({typeId:req.body.typeId})
        if (!result) {
            return res.json({
             data:null,
             code:"0000",
             message:"something went worng please check in post service"
            }) 
         }
        return res.json({
            data:result,
            code:"1111",
            message:"get all filter post"
        })
    } catch (error) {
        return res.json({
            data:null,
            code:"0000",
            systemIssue:error,
            message:"service is down"
        })
    }

}
exports.getAllFilters=async(req,res)=>{
    try {
        const result= await postTypeModel.find()
        if (!result) {
            return res.json({
             data:null,
             code:"0000",
             message:"something went worng please check in post service"
            }) 
         }
        return res.json({
            data:result,
            code:"1111",
            message:"get all filters"
        })
    } catch (error) {
        return res.json({
            data:null,
            code:"0000",
            systemIssue:error,
            message:"service is down"
        })
    }

}
exports.createComments=async(req,res)=>{
    try {
        console.log(req.body);
        const result= await postModel.updateOne({_id:req.body.id},{
            $push:{comments:req.body.items}
        }) 
        console.log(result);
        if (!result) {
            return res.json({
             data:null,
             code:"0000",
             message:"something went worng please check in post service"
            }) 
         }
        return res.json({
            data:result,
            code:"1111",
            message:"comment added successfully"
        })
    } catch (error) {
        return res.json({
            data:null,
            code:"0000",
            systemIssue:error.message,
            message:"service is down"
        })
    }

}
exports.getAllComments=async(req,res)=>{
    try {
        console.log(req.body);
        const result= await postModel.find({_id:req.body.id}).select("comments") 
        console.log(result);
        if (!result) {
            return res.json({
             data:null,
             code:"0000",
             message:"something went worng please check in post service"
            }) 
         }
        return res.json({
            data:result[0],
            code:"1111",
            message:"get all comment successfully"
        })
    } catch (error) {
        return res.json({
            data:null,
            code:"0000",
            systemIssue:error.message,
            message:"service is down"
        })
    }

}