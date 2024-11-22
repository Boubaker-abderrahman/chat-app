import useAuthStore from "../../store/auth.store.js";
import useSelectedConversationStore from "../../store/selected.conversation.store.js";
import { extractTime } from "../../utils/extractTime.js";
import {CheckCheck}  from 'lucide-react'
const Message = ( {message} ) => {
	const { user } = useAuthStore();
	const { selectedConversation } = useSelectedConversationStore();
	const fromMe = message.senderId === user?._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? user?.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
	


	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor}  pb-2`}>{message.message}</div>
			<div className={`chat-footer relative opacity-50 text-gray-200 text-xs  flex ${fromMe ? "left-2" :"" } gap-1 items-center`}>
				{formattedTime}
				 {fromMe ?  <CheckCheck className={`${message.seen ? "text-sky-400" : ""} w-4  `}  /> : null}
				 </div>
		</div>
	);
};
export default Message;

// const Message = ()=>{
//     return (
//         		<div className={`chat chat-end`}>
//         			<div className='chat-image avatar'>
//         				<div className='w-10 rounded-full'>
//         					<img alt='Tailwind CSS chat bubble component'  />
//         				</div>
//         			</div>
//         			<div className={`chat-bubble text-white  pb-2`}>abcd</div>
//         			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>3:00</div>
//         		</div>
//         	);
// } 

// export default Message;
