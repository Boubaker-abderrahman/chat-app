import { useEffect } from "react"
import useConversationStore from "../../store/conversation.store"
import Conversation from './Conversation.jsx'
import { getRandomEmoji } from "../../utils/emojis.js"
function Conversations() {
	const {conversation,getConversation} = useConversationStore()
	useEffect(()=>{
		const fetch = async ()=>{

			await getConversation()
		}
			fetch()
	},[getConversation])
  return (
    <div className='py-2 flex flex-col overflow-auto'>
			{conversation.map((conversation)=>{
				return <Conversation key={conversation._id} conversation={conversation} emoji={getRandomEmoji()} />

			})}
			
		</div>
  )
}

export default Conversations
