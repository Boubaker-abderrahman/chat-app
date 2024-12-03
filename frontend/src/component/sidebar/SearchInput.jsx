import { Search } from "lucide-react"
import useConversationStore from "../../store/conversation.store";
import { useState } from "react";
import useSelectedConversationStore from "../../store/selected.conversation.store";
import toast from "react-hot-toast";


const SearchInput = () => {
	const [search, setSearch] = useState("");
	const {conversation : conversations} = useConversationStore()
	const {setSelectedConversation }= useSelectedConversationStore()

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};

  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
			<input type='text' placeholder='Search…' className='input  h-10 input-bordered rounded-full ' value={search} onChange={(e)=>setSearch(e.target.value)} />
			<button type='submit' className='btn btn-circle bg-transparent   text-white'>
				<Search className='w-4 h-4 outline-none' />
			</button>
	</form>
  )
}

export default SearchInput
