const { Conversation } = require("../Models/conversationModels.js");
const { User } = require("../Models/userModels.js");

const getUserBySearch = async (req, res) => {
    try {
        const search = req.query.search || '';
        const currentUserId = req.user._conditions._id;
        const user = await User.find({
            $and: [
                {
                    $or: [
                        { username: { $regex: '.*' + search + '.*', $options: 'i' } },
                        { fullname: { $regex: '.*' + search + '.*', $options: 'i' } }
                    ]
                }, {
                    _id: { $ne: currentUserId }
                }
            ]
        }).select("-password").select("-email");

        res.status(200).send(user);

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
        console.log(error);
    }
};

const getChatters = async (req, res) => {
    try {
        const currentUserId = req.user._conditions._id;
       
        const chatters = await Conversation.find({
            participants: currentUserId
        }).sort({
            updatedAt: -1
        });

      
        if (!chatters || chatters.length === 0) {
            return res.status(200).send([]);
        }

        const participantsIDs = chatters.reduce((ids, conversation) => {
           
            const otherParticipants = conversation.participants.filter(id => id !== currentUserId);
           
            return [...ids , ...otherParticipants]
        }, []);

        

        const otherParticipantsIDs = participantsIDs.filter(id => id.toString() !== currentUserId.toString());

        const user = await User.find({_id:{$in:otherParticipantsIDs}}).select("-password").select("-email");

        
        const users = otherParticipantsIDs.map(id => user.find(user => user._id.toString() === id.toString()));

        
        res.status(200).send(users);

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
        console.log(error);
    }
};

module.exports = { getUserBySearch, getChatters };
