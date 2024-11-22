import { useEffect, useRef } from "react";
import useSelectedConversationStore from "../../store/selected.conversation.store.js";
import Message from "./Message.jsx";
import axios from "axios";
import useListenMessages from "../../socket/useListenMessages.js";
import { useSocketContext } from "../../socket/useSocketContext.jsx";
import useAuthStore from "../../store/auth.store.js";

axios.defaults.withCredentials = true;


const Messages = () => {
	const {  messages ,setMessages, selectedConversation}=useSelectedConversationStore()

	const {user} = useAuthStore()
	
	const {socket} = useSocketContext()
	
	const lastMessageRef = useRef();
	
	useListenMessages()

	const getMessages = async (receiverId)=>{
        try {
            const res = await axios.get(`https://chat-app-tbd3.onrender.com/api/messages/${receiverId}`)
            if(!res){throw new Error("Error Fetching Message")}
            setMessages(res.data.messages)
        } catch (error) {
            console.log(error)
            
        }
    }

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

    
	useEffect(()=>{
		if(selectedConversation?._id){
			getMessages(selectedConversation?._id)
		}
	},[selectedConversation?._id])

	


	useEffect(()=>{
		const lastMessageIsFromOtherUser = messages.length && messages[messages.length - 1].senderId !== user._id && !messages[messages.length - 1].seen ;
		if (lastMessageIsFromOtherUser) 
		{socket.emit("markMessageSeen" , {
			conversationId : selectedConversation?._id,
			userId : user._id
			})}

			socket.on("seenMessage" ,(conversationId)=>{
				console.log("i am in Socket seen message")
				if(conversationId === selectedConversation?._id){
					const newMessages = messages.map(message => {
						if(message.seen === false){
							return {...message , seen :true}
						}
						
						
						return message
					});
					setMessages(newMessages)
				}
			})
			return () => socket?.off("seenMessage");
		
		

		
	},[messages, selectedConversation?._id, setMessages, socket, user._id])


	
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{messages.map((message)=>
					(
						<div key={message._id} ref={lastMessageRef}>
							<Message message={message} />
						</div>
					)			
				) }
			
		</div>
	);
};
export default Messages;