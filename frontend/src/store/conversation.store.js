import axios from "axios";
import { create } from "zustand";

axios.defaults.withCredentials = true;

const useConversationStore = create((set)=>({
    conversation : [],
    error : null,
    isLoading : false,
    
    getConversation : async ()=>{
        set({error : null , isLoading : true})
        try {
            const res = await axios.get("http://localhost:5000/api/users")
            set({conversation : res.data.users,error : null , isLoading : false})
        } catch (error) {
            console.log(error)
            set({error : error.message , isLoading : false})

            
        }
    }
}))

export default useConversationStore