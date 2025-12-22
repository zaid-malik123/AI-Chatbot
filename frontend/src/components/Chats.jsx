import { useParams } from "react-router-dom";
import ChatInput from "./ChatInput";
import UserMessage from "./UserMessage";
import AIMessage from "./AIMessage";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { setShowNewModal, setPendingMessage } from "../store/slices/userSlice";

const Chats = () => {
  const { chatId } = useParams();
  const { socket } = useSelector((state) => state.userSlice || {});
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  // Temporary mock messages for each chatId — replace with API/store later
  

  const dispatch = useDispatch();

  const userMessage = async (message) => {
    if (!message) return;

    // create optimistic user message
    const userMsg = {
      id: `u-${Date.now()}`,
      role: "user",
      message,
      pending: true,
      createdAt: new Date().toISOString(),
    };
    setMessages((m) => [...m, userMsg]);

    // send via socket if available, otherwise fallback to POST
    try {
      if (socket) {
        socket.emit("user-message", { message, chat: chatId });
      } else {
        // fallback endpoint — replace with your send API if available
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/chat/send`,
          { message, chatId },
          { withCredentials: true }
        );
      }
    } catch (err) {
      console.error("send message error", err);
    }
  };

  // when no chat is open and user types a message, open the New Chat modal
  const handleEmptySend = (message) => {
    if (!message) return;
    // store the pending message in Redux and open modal for creating chat
    dispatch(setPendingMessage(message));
    dispatch(setShowNewModal(true));
  };

  const getChatMessage = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/chat/get-msg/${chatId}`, {
        withCredentials: true,
      });
      // assume res.data is an array of messages
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("getChatMessage error", err);
      setMessages([]);
    }
  };

  // load messages when chatId changes
  useEffect(() => {
    getChatMessage();

    // setup socket listener once per mounted chat
    if (socket) {
      // keep ref for cleanup
      socketRef.current = socket;

      const handler = (data) => {
        // expect data to be { message, role: 'ai' }
        const aiMsg = {
          id: `ai-${Date.now()}`,
          role: "model",
          message: data?.res || (typeof data === "string" ? data : ""),
          createdAt: new Date().toISOString(),
        };
        setMessages((m) => [...m, aiMsg]);
        console.log(aiMsg) 
      };

      socket.on("ai-response", handler);
      return () => {
        socket.off("ai-response", handler);
      };
    }
  }, [chatId, socket]);

  // scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [messages]);

  // const messages = mockMessages[String(chatId)] || [];

  return (
    <div
      className={`h-full w-full md:w-[70%]  flex flex-col ${
        chatId ? "justify-start" : "justify-center items-center"
      } `}
    >
      {/* Empty state */}
      {!chatId && (
        <div className="flex flex-col gap-10 w-full px-5 max-w-xl">
          <h2 className="text-white text-3xl text-center">
            What’s on the agenda today?
          </h2>

          <ChatInput userMessage={handleEmptySend} />
        </div>
      )}

      {/* Chat opened */}
      {chatId && (
        <div className="w-full max-w-3xl mb-6 flex flex-col px-4 py-6 h-full ">
          {/* messages container: scrollable, top-to-bottom */}
          <div className="flex-1 mb-4 overflow-y-auto  space-y-2">
            {/* {messages?.length === 0 && (
              <div className="text-white/60 text-center py-24">
                No messages yet. Say hi!
              </div>
            )} */}

              <div className="flex flex-col">
                {messages?.map((m) =>
                  m.role === "user" ? (
                    <UserMessage key={m.id} text={m.message} />
                  ) : (
                    <AIMessage key={m.id} text={m.message} />
                  )
                )}
                <div ref={messagesEndRef} />
              </div>
          </div>

          <div  className="mt-2">
            {/* input stays at bottom */}
            <ChatInput userMessage={userMessage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;
