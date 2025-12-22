import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Register from "./Register";
import Sidebar from "../components/Sidebar";
import TextArea from "../components/TextArea";
import Login from "../components/Login";
import CreateChatModal from "../components/CreateChatModal";
import { addChat, setShowNewModal } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { user, showNewModal } = useSelector(state => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [authView, setAuthView] = useState(null);

  useEffect(() => {
    if (!user || !user.email) setAuthView("login");
    else setAuthView(null);
  }, [user]);

  const chatNameVal = async (chatName) => {
    
    try {
       const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/chat/new`,
        { chatName: chatName },
        { withCredentials: true }
      );
      const created = res?.data?.chat ||
        res?.data || { chatName: chatInp || "New Chat" };
      dispatch(addChat(created));
      dispatch(setShowNewModal(false));
      navigate(`/c/${res.data._id}`)
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="w-full h-full flex relative">

      {/* Auth overlays */}
      {authView === "login" && <Login onSwitch={setAuthView} />}
      {authView === "register" && <Register onSwitch={setAuthView} />}

      {/* Main layout */}
      <Sidebar />
      <TextArea />

      {/* ✅ CREATE CHAT MODAL (FULL SCREEN) */}
      {showNewModal && (
        <CreateChatModal
          chatNameVal={chatNameVal}
          onClose={() => dispatch(setShowNewModal(false))}
        />
      )}
    </div>
  );
};

export default Home;
