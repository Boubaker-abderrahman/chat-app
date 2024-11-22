import { Server } from "socket.io";
import http from "http";
import express from "express";
import Conversation from "../models/conversation.model.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5173"],
		methods: ["GET", "POST"],
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("markMessageSeen",async ({conversationId,userId})=>{

		try {
			
			let res = await Conversation.find({participants : {$all : [conversationId,userId]}}).populate("messages").then((data)=>{return data[0]?.messages || []}).then((data)=>data.filter((message)=>message.seen === false))
			res.forEach(async (message)=>{message.seen=true
				await message.save()
				
			})
			console.log(userSocketMap[conversationId])
			io.to(userSocketMap[conversationId]).emit("seenMessage" , userId);
			
			
		} catch (error) {
			console.log(error)
		}
	
	})
	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});


export { app, io, server };