import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js"

const sendMessage = async (req,res)=>{

    try {
        const {id : receiverId} = req.params
        const {message} = req.body
        const senderId = req.user._id

        let conversation = await Conversation.findOne({participants : {$all : [receiverId , senderId]}})

        if(!conversation){
            conversation = await Conversation.create({
                participants : [receiverId , senderId]
            })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })

        conversation.messages.push(newMessage._id)

        await conversation.save()

        const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

        res.status(201).json({message : "Message Sent Successfully" , newMessage})


    } catch (error) {
        res.status(401).json({message : "Message Sent Failed" , error : error.message})

        
    }

}

const getMessages = async (req,res)=>{

    try {
        const {id : receiverId} = req.params
        const senderId = req.user._id 

        const conversation = await Conversation.findOne({participants : {$all : [receiverId , senderId]},}).populate("messages")
        if(!conversation){
           return res.status(200).json({message : "getMessage success Non Conversation " , messages : []})

        }
        
        const messages = conversation.messages

        res.status(201).json({message : "getMessage success " , messages : messages})
    } catch (error) {

		console.log("Error in getMessages controller: ", error.message);
        res.status(201).json({message : "getMessage Failed " , error : error.message})

        
    }
}

const messageControllers = {
    sendMessage,
    getMessages
}

export default messageControllers
