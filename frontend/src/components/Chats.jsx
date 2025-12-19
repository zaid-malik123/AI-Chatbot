import { useParams } from "react-router-dom";
import ChatInput from "./ChatInput";
import UserMessage from "./UserMessage";
import AIMessage from "./AIMessage";

const Chats = () => {
  const { chatId } = useParams();

  // Temporary mock messages for each chatId — replace with API/store later
  const mockMessages = {
    "0": [
      { id: 1, role: "user", text: "Hi, tell me about AI." },
       { id: 1, role: "user", text: "Hi, tell me about AI." },
        { id: 1, role: "user", text: "Hi, tell me about AI." },
         { id: 1, role: "user", text: "Hi, tell me about AI." },
          { id: 1, role: "user", text: "Hi, tell me about AI." },
           { id: 1, role: "user", text: "Hi, tell me about AI." },
            { id: 1, role: "user", text: "Hi, tell me about AI." },
             { id: 1, role: "user", text: "Hi, tell me about AI." },
              { id: 1, role: "user", text: "Hi, tell me about AI." },
      { id: 2, role: "ai", text: "AI (Artificial Intelligence) is a field of computer science thatmadjsajdhahjdasjhdasjdashjdahjhdjahdajhdjahjsahdajshdjahdjadjasdhjashdjashdjsadhjahdjas..." },
    ],
    "1": [
      { id: 1, role: "user", text: "What is JavaScript?" },
      { id: 2, role: "ai", text: "JavaScript is a programming language used for web development...", },
    ],
  };

  const messages = mockMessages[String(chatId)] || [];

  return (
    <div
      className={`h-full w-[70%]  flex flex-col ${
        chatId ? "justify-start" : "justify-center items-center"
      } `}
    >
      {/* Empty state */}
      {!chatId && (
        <div className="flex flex-col gap-10 w-full max-w-xl">
          <h2 className="text-white text-3xl text-center">What’s on the agenda today?</h2>

          <ChatInput />
        </div>
      )}

      {/* Chat opened */}
      {chatId && (
        <div className="w-full max-w-3xl mb-6 flex flex-col px-4 py-6 h-full ">
          {/* messages container: scrollable, top-to-bottom */}
          <div className="flex-1 mb-4 overflow-y-auto  space-y-2">
            {messages.length === 0 && (
              <div className="text-white/60 text-center py-24">No messages yet. Say hi!</div>
            )}

            <div className="flex flex-col">
              {messages.map((m) =>
                m.role === "user" ? (
                  <UserMessage key={m.id} text={m.text} time={m.time} />
                ) : (
                  <AIMessage key={m.id} text={m.text} time={m.time} />
                )
              )}
            </div>
          </div>

          <div className="mt-2">
            {/* input stays at bottom */}
            <ChatInput />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;
