import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setChats } from "../store/slices/userSlice";

const useGetUserChat = () => {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch()
  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/chat/all-chat`,
        { withCredentials: true }
      );
      console.log(res.data)
     dispatch(setChats(res.data || []))
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);
};

export default useGetUserChat;
