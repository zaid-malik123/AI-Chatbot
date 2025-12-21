import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import useGetUserChat from "./hooks/useGetUserChat";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./store/slices/userSlice";
const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  useGetCurrentUser();
  useGetUserChat();

  useEffect(() => {
    if (!user) return;

    const socketIo = io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
    });

    dispatch(setSocket(socketIo));

    return () => {
      socketIo.close();
    };
  }, [user]);

  return (
    <div className="w-screen h-screen bg-[#212121] text-text flex">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Chat route shows same Home layout but provides chatId param */}
        <Route path="/c/:chatId" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
