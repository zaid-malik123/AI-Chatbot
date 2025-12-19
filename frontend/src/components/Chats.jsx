import { useParams } from "react-router-dom";
import ChatInput from "./ChatInput";

const Chats = () => {
  const { chatId } = useParams();

  return (
    <div
      className={`h-full w-[70%] flex flex-col ${
        chatId ? "justify-end" : "justify-center"
      } items-center`}
    >
      {/* Empty state */}
      {!chatId && (
        <div className="flex flex-col gap-10 w-full max-w-xl">
          <h2 className="text-white text-3xl text-center">
            What’s on the agenda today?
          </h2>

          <ChatInput />
        </div>
      )}

      {/* Chat opened */}
      {chatId && (
        <div className="w-full max-w-3xl mb-6">
          <ChatInput />
        </div>
      )}
    </div>
  );
};

export default Chats;
