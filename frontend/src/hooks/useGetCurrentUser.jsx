import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { setUser } from "../store/slices/userSlice";

const useGetCurrentUser = () => {
const dispatch = useDispatch()
const fetchCurrentUser = async ()=>{
try {
  const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/currUser`,{withCredentials:true})
  dispatch(setUser(res.data))
} catch (error) {
  console.log(error)
}
}
useEffect(()=>{
  fetchCurrentUser()
},[]) 
};

export default useGetCurrentUser;