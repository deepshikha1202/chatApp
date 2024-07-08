const express = require("express");
const dbconnect = require("./DB/dbconnect.js");
const authRouter=require("./rout/authUser.js");
const messageRouter=require("./rout/messageRout.js");
const userRouter=require("./rout/userRout.js");
const { Message } = require("./Models/messageModels.js");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const app=express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
  res.send("server is working");
});

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    dbconnect(); 
    console.log(`Working at ${PORT} `);
});