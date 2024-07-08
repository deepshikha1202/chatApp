const jwt=require("jsonwebtoken");
const { User } = require("../../Models/userModels.js");

const isLogin=(req,res,next)=>{
    try {
        
        const token=req.cookies.jwt;
        
        if(!token)return res.status(500).send({success:false,message:"User unauthorize"});
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        if(!decode)return res.status(500).send({success:false,message:"User unauthorize-Invalid token"});
        const user=User.findById(decode.userId).select("-password");
        if(!user)return res.status(500).send({success:false,message:"User not found"});
        req.user=user;
        next();
    } catch (error) {
        console.log(`error in login middleware:${error.message}`);
        res.status(500).send({
            success:false,
            message:error
        });
    }

}


module.exports=isLogin;