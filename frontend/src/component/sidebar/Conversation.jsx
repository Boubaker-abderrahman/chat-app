import { useSocketContext } from "../../socket/useSocketContext.jsx";
import useSelectedConversationStore from "../../store/selected.conversation.store";

const Conversation = ({conversation,emoji}) => {

	const {profilePic,fullName} = conversation
	const {  selectedConversation , setSelectedConversation } = useSelectedConversationStore()
	const isSelected = selectedConversation?._id === conversation._id;
	const {  onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);
	
	

	const HandelConversationClick = ()=>{
		setSelectedConversation(conversation)
		
	}

	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-blue-900 rounded p-2 py-1 cursor-pointer ${isSelected? "bg-blue-900" : "" } `} onClick={HandelConversationClick}>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img
							src={profilePic || 'https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{fullName}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			<div className='divider my-0 py-0 h-1' />
		</>
	);
};
export default Conversation;