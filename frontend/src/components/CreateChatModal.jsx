import { useState } from "react";

const CreateChatModal = ({ onClose, chatNameVal }) => {

  const [chatInpVal, setChatInpVal] = useState("")
   

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-[#212121]
          w-full max-w-md
          rounded-xl
          p-6
        "
      >
        <h3 className="text-white text-xl mb-4">Create new chat</h3>

        <input
          onChange={(e) => setChatInpVal(e.target.value)}
          value={chatInpVal}
          className="w-full px-4 py-3 rounded-md bg-[#2b2b2b] text-white mb-4 outline-0"
          placeholder="Chat title (optional)"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-white/70">
            Cancel
          </button>
          <button onClick={() => chatNameVal(chatInpVal)} className="px-4 py-2 bg-[#191717] text-white rounded-md">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChatModal;
