
import { useEffect } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import useSelectedConversationStore from "../../store/selected.conversation.store.js";
import useAuthStore from "../../store/auth.store";
import { MessagesSquare } from "lucide-react";

const MessageContainer = () => {
	const {selectedConversation,setSelectedConversation}= useSelectedConversationStore()

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='md:min-w-[450px] w-full flex flex-col'>
			{!selectedConversation ? (
				<NoChatSelected />
			):(
				<>
					{/* Header */}
					<div className='bg-transparent px-4 py-2 mb-2 flex justify-center'>
						<span className=' text-gray-900'>To: {"\t"} </span> <span className='text-gray-900 font-bold'> {selectedConversation.fullName}</span>
					</div>

					<Messages />
					<MessageInput />
				</>

			)}
			
		</div>
	);
};
export default MessageContainer;


const NoChatSelected = () => {
	const { user } = useAuthStore();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {user.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<MessagesSquare  className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};