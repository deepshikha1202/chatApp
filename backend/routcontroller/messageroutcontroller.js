// messageController.js

const { populate } = require("dotenv");
const { Conversation } = require("../Models/conversationModels.js");
const { Message } = require("../Models/messageModels.js");
const {User}=require("../Models/userModels.js")


const sendMessage = async (req, res) => {
    try {
        const {message}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._conditions._id;

        let chats=await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })
        if(!chats){
            chats=await Conversation.create({
                participants:[senderId,receiverId] 
            })
        }
        const newMessages=new Message({
            senderId,
            receiverId,
            message,
            conversationId:chats._id
        })
        if(newMessages){
            chats.messages.push(newMessages._id);
        }

        //SOCKET.IO
        await Promise.all([chats.save(),newMessages.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
           io.to(receiverSocketId).emit("newMessage",newMessages)
        }
        res.status(201).send(newMessages)

    } catch (error) {
        res.status(500).send({
            success:false,
            message:error
        }) 
        console.log(error); 
    }
};

const getMessage = async (req, res) => {
    try {
        const {id:receiverId}=req.params;
        const senderId=req.user._conditions._id;

        const chats=await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate("messages")

        if(!chats) return res.status(200).send([]);
        const message=chats.messages;
        res.status(200).send(message);



    } catch (error) {
        res.status(500).send({
            success:false,
            message:error
        }) 
        console.log(error); 
    }

}

module.exports = { sendMessage, getMessage };
