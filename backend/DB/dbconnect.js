const mongoose = require("mongoose");

const dbconnect =async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT),
        console.log("db connected succesfully")
    }catch(error){
      console.log("db connection error: ", error);
    }

}

module.exports = dbconnect;
