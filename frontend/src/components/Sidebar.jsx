import { RiChatVoiceAiLine } from "react-icons/ri";
import { BsReverseLayoutSidebarReverse } from "react-icons/bs";
import { RxPencil2 } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";
import { setChats, addChat, setUser, setShowNewModal, setPendingMessage, clearPendingMessage } from "../store/slices/userSlice";

const Sidebar = () => {
  const { chats = [], showNewModal, pendingMessage, socket } = useSelector((state) => state.userSlice || {});
  const { user } = useSelector((state) => state.userSlice);
  const [isOpen, setIsOpen] = useState(false)
  const [chatInp, setChatInp] = useState("");
  const navigate = useNavigate();
  const { chatId } = useParams();
  // modal visibility now controlled via Redux: `showNewModal`
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") dispatch(setShowNewModal(false));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === modalRef.current) dispatch(setShowNewModal(false));
  };

  const createChat = async () => {
    const newIndex = chats.length; // index for the new chat
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/chat/new`,
        { chatName: chatInp },
        { withCredentials: true }
      );
      const created = res?.data?.chat || res?.data || { chatName: chatInp || "New Chat" };
      dispatch(addChat(created));
      setChatInp("");
      dispatch(setShowNewModal(false));
      // navigate to created chat (prefer server _id if available)
      const newChatId = res?.data?._id || created._id || newIndex;
      navigate(`/c/${newChatId}`);

      // if there was a pending message (user typed before creating), send it into the new chat
      if (pendingMessage) {
        try {
          if (socket) {
            socket.emit("user-message", { message: pendingMessage, chat: newChatId });
          } else {
            await axios.post(
              `${import.meta.env.VITE_SERVER_URL}/api/chat/send`,
              { message: pendingMessage, chatId: newChatId },
              { withCredentials: true }
            );
          }
        } catch (err) {
          console.error("send pending message error", err);
        }
      }
      dispatch(clearPendingMessage());
    } catch (error) {
      console.log(error);
      const created = { chatName: chatInp || "New Chat" };
      dispatch(addChat(created));
      dispatch(setShowNewModal(false));
      navigate(`/c/${newIndex}`);
      if (pendingMessage) {
        try {
          if (socket) {
            socket.emit("user-message", { message: pendingMessage, chat: newIndex });
          } else {
            await axios.post(
              `${import.meta.env.VITE_SERVER_URL}/api/chat/send`,
              { message: pendingMessage, chatId: newIndex },
              { withCredentials: true }
            );
          }
        } catch (err) {
          console.error("send pending message error (fallback)", err);
        }
      }
      dispatch(clearPendingMessage());
    }
  };

  const handleLogOut = async () => {
     try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/logout`, {withCredentials: true})
        dispatch(setUser([]))
        dispatch(setChats([])) 
        setIsOpen(false)
     } catch (error) {
        console.log(error)
     }
  }
  return (
    <div className="w-[20%] h-full bg-[#171718] flex flex-col relative">
      <header className="w-full flex items-center justify-between p-5 ">
        <div>
          <RiChatVoiceAiLine color="white" size={25} />
        </div>
        <div>
          <BsReverseLayoutSidebarReverse color="white" size={20} />
        </div>
      </header>

      <section className="w-full flex-1 mt-7 overflow-auto">
        <div className="flex flex-col gap-1">
          <button
            onClick={() => dispatch(setShowNewModal(true))}
            className="flex items-center gap-3 px-5 py-2 hover:bg-[#212121] hover:rounded-xl text-left"
          >
            <RxPencil2 color="white" size={18} />
            <span className="text-white font-[200] text-sm">New Chat</span>
          </button>
          <div className="flex items-center gap-3 px-5 py-2 hover:bg-[#212121] hover:rounded-xl">
            <IoIosSearch color="white" size={18} />
            <div className="text-white font-[200] text-sm">Search Chats</div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 ">
          <h5 className="text-white/60 font-[400] text-sm ml-5">Your Chats</h5>
          <div>
            {user &&
              Array.isArray(chats) &&
              chats.map((chat, idx) => {
                const isActive = String(idx) === String(chatId);

                return (
                  <div
                    key={idx}
                    onClick={() => navigate(`/c/${chat._id}`)}
                    className={`flex items-center gap-3 px-5 py-2 hover:rounded-xl ${
                      isActive ? "bg-[#212121]" : ""
                    }`}
                  >
                    <div className="text-white font-[200] text-sm">
                      {chat.chatName}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div onClick={() => setIsOpen(prev => !prev)} className="absolute bottom-0 left-0 flex gap-3 px-5 py-3 bg-[#171718] w-full hover:bg-[#212121] cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-orange-800 flex items-center justify-center text-w">
            <h1>Z</h1>
          </div>
          <div className="text-white flex flex-col gap-1">
            <span className="font-[300] text-md">Zaid Malik</span>
            <span className="font-[300] text-sm">Free</span>
          </div>
        </div>
      </section>

      {/* New Chat full-screen modal overlay */}
      {showNewModal && (
        <div
          ref={modalRef}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <div className="bg-transparent w-full h-full flex items-center justify-center">
            <div className="bg-[#212121] rounded-xl w-[90%] max-w-2xl p-8 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-xl font-medium">
                  Create new chat
                </h3>
                <button
                  onClick={() => dispatch(setShowNewModal(false))}
                  className="text-white/70 hover:text-white"
                >
                  Close
                </button>
              </div>
              <p className="text-white/70 mb-4">
                Start a new conversation. Enter a title below.
              </p>
              <input
                onChange={(e) => setChatInp(e.target.value)}
                value={chatInp}
                className="w-full px-4 py-3 rounded-md bg-[#2b2b2b] text-white mb-4 outline-0"
                placeholder="Chat title (optional)"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => dispatch(setShowNewModal(false))}
                  className="px-4 py-2 rounded-md bg-[#2f2f2f] text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    createChat();
                    // close modal (createChat will also attempt to close)
                    dispatch(setShowNewModal(false));
                  }}
                  className="px-4 py-2 rounded-md bg-[#191717] text-white"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {isOpen && (
         <div className="absolute bg-[#353535] w-full bottom-[70px] rounded-2xl p-5 flex flex-col gap-5"> 
         <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-orange-800 flex items-center justify-center text-w">
            <h1 className="text-white">{user?.userName?.slice(0,1)}</h1>
          </div>
          <div className="text-white flex flex-col gap-1">
            <span className="font-[300] text-md">{user.userName}</span>
            <span className="font-[300] text-sm">{user.email}</span>
          </div>
         </div>
          <div className="h-[1px]  bg-[#212121]"></div>
          <div onClick={handleLogOut} className="flex items-center gap-3 cursor-pointer">
             <IoIosLogOut size={20} color="white" />
             <span className="text-white font-[300]">Log Out</span>
          </div>
         </div>
      )}
    </div>
  );
};

export default Sidebar;
