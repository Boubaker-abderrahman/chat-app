import { Send } from "lucide-react";
import { useState } from "react";
import useSelectedConversationStore from "../../store/selected.conversation.store.js";
import axios from "axios";

axios.defaults.withCredentials = true;

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { messages, setMessages, selectedConversation } =
    useSelectedConversationStore();

  const handelSendMessage = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL_LOCALHOST}/api/messages/send/${selectedConversation._id}`,
        { message }
      );
      if (!res) {
        throw new Error("Failed Sending message ");
      }
      setMessages([...messages, res.data.newMessage]);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="px-4 my-3" onSubmit={handelSendMessage}>
      <div className="w-full relative ">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3 "
        >
          <Send />
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
