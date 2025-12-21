import { useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
const ChatInput = ({ userMessage = () => {} }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    userMessage(message)
    setMessage("")
  }

  return (
    <div className="w-full relative">
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className="w-full bg-[#303031] px-6 p-4 rounded-3xl text-white text-md outline-0 placeholder:text-white/50"
        type="text"
        placeholder="Ask anything"
      />

      <div onClick={handleSendMessage} className="absolute right-[20px] top-[8px] w-10 h-10 bg-white rounded-full flex items-center justify-center">
        <FaArrowUp />
      </div>
    </div>
  );
};

export default ChatInput