import { useEffect } from "react";


import notificationSound from "../assets/sounds/notification.mp3";
import { useSocketContext } from "./useSocketContext.jsx";
import useSelectedConversationStore from "../store/selected.conversation.store.js";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages ,selectedConversation} = useSelectedConversationStore();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			const sound = new Audio(notificationSound);
			sound.play();
			if(selectedConversation?._id === newMessage.receiverId ||selectedConversation?._id=== newMessage.senderId)setMessages([...messages, newMessage]);
		});

		

		return () => socket?.off("newMessage");
	}, [socket, messages, selectedConversation._id]);
};
export default useListenMessages;