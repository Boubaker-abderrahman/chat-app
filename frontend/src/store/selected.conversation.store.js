import axios from "axios";
import { create } from "zustand";

axios.defaults.withCredentials = true;

const useSelectedConversationStore = create((set)=>({
    selectedConversation : null,
    setSelectedConversation : (selectedConversation)=>{set({selectedConversation})},
    messages: [],
    setMessages: (messages)=>set({messages}),

    
}))

export default useSelectedConversationStore