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
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();

  const userMessage = async (message) => {
    if (!message) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      role: "user",
      message,
      createdAt: new Date().toISOString(),
    };

    const aiPlaceholder = {
      id: `ai-${Date.now()}`,
      role: "model",
      message: "",
      pending: true,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg, aiPlaceholder]);

    try {
      if (socket) {
        socket.emit("user-message", { message, chat: chatId });
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/chat/send`,
          { message, chatId },
          { withCredentials: true }
        );

        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiPlaceholder.id
              ? {
                  ...m,
                  message: res.data?.message || "AI response",
                  pending: false,
                }
              : m
          )
        );
      }
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiPlaceholder.id
            ? { ...m, message: "Something went wrong", pending: false }
            : m
        )
      );
    }
  };

  const handleEmptySend = (message) => {
    if (!message) return;
    dispatch(setPendingMessage(message));
    dispatch(setShowNewModal(true));
  };

  const getChatMessage = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/chat/get-msg/${chatId}`,
        { withCredentials: true }
      );
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch {
      setMessages([]);
    }
  };

  useEffect(() => {
    if (!chatId) return;
    getChatMessage();

    if (!socket) return;

    const handler = (data) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.pending && m.role === "model"
            ? {
                ...m,
                message: data?.res || data,
                pending: false,
              }
            : m
        )
      );
    };

    socket.on("ai-response", handler);
    return () => socket.off("ai-response", handler);
  }, [chatId, socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`h-full w-full md:w-[70%] flex flex-col ${
        chatId ? "justify-start" : "justify-center items-center"
      }`}
    >
      {!chatId && (
        <div className="flex flex-col gap-10 w-full px-5 max-w-xl">
          <h2 className="text-white text-3xl text-center">
            What’s on the agenda today?
          </h2>
          <ChatInput userMessage={handleEmptySend} />
        </div>
      )}

      {chatId && (
        <div className="w-full max-w-3xl flex flex-col px-4 py-6 h-full">
          <div className="flex-1 overflow-y-auto space-y-2">
            {messages.map((m) =>
              m.role === "user" ? (
                <UserMessage key={m.id} text={m.message} />
              ) : (
                <AIMessage
                  key={m.id}
                  text={m.message}
                  pending={m.pending}
                />
              )
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-2">
            <ChatInput userMessage={userMessage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;
