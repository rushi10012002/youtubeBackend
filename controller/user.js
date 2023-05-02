const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const userModel=require('../model/user');

exports.LoginUser=async(req,res)=>{
try {
    const {email,password}=req.body;
        const findUser=await userModel.findOne({email}).select();
        if (!findUser) {
            return res.json({
                data:null,
                code:"0000",
                message:"User not found Please enter the valid email id"
               }) 
        }
        const match= await bcrypt.compare(password,findUser.password);
        if (!match) {
            return res.json({
                data:null,
                code:"0000",
                message:"please enter the correct password"
               }) 
        }
        const token =await jwt.sign({id:findUser._id},"screatkey");
        return res.json({
            data:[{
                userName:findUser.userName,
               email:findUser.email,
               phone:findUser.phone,
               token,
               userProfile:findUser.image,
               createdAt:findUser.createdAt,
               updatedAt:findUser.updatedAt,
            }],
            code:"1111",
            message:"user login successfully"
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
exports.resisterUser=async(req,res)=>{
try {
    console.log("resister user",req.body);
    console.log(req.files);
    console.log(req.file);
    const checkUserExist= await userModel.findOne({email:req.body.email});
    if (checkUserExist) {
        return res.json({
            data:null,
            code:"0000",
            message:"Email Id is already exist Please use another email Id for the resistration"
           }) 
    }
    const {password}=req.body;
    const salt=await bcrypt.genSalt(12);
    const newPassword=await bcrypt.hash(password,salt);
console.log(newPassword);
    const result= await userModel.create({
        userName:req.body.userName,
        email:req.body.email,
        phone:req.body.phone,
        password:newPassword,
        image: req.files.image[0].path
    });
    if (!result) {
       return res.json({
        data:null,
        code:"0000",
        message:"something went wrong please check again"
       }) 
    }

    return res.json({
        data:null,
        code:"1111",
        message:"user resister successfully"
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