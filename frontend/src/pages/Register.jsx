import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios"
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";

 const Register = () => {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log(import.meta.env.VITE_SERVER_URL)

  const handleSignup = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/signup`, {userName, email, password}, {withCredentials: true})
      dispatch(setUser(res.data))
      setUserName("")
      setEmail("")
      setPassword("")
      // console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full h-full inset-0 bg-black/50 absolute z-40 flex items-center justify-center backdrop-blur-[1px] px-5'>
      
      <div className='p-5 bg-[#212121] flex flex-col w-[400px] rounded-xl gap-5'>
        <div className='text-white text-center mt-5'>
           <h2 className='text-[30px] font-[300]'>Sign up</h2>
           <p className='text-sm font-[200] mt-5'>You’ll get smarter responses and can upload files, images, and more.</p>
        </div>

        <button className="flex items-center justify-center gap-3 w-full py-4 bg-[#2f2f2f] rounded-3xl mt-5">
          <FcGoogle size={30} />
          <span className="text-[18px] text-white font-[300]">Continue with Google</span>
        </button>

        <div className="flex items-center gap-3">
           <div className="h-[1px] flex-1 bg-[#433e3e]"></div>
           <span className="text-[#433e3e]">Or</span>
           <div className="h-[1px] flex-1 bg-[#433e3e]"></div>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col w-full flex-1 gap-5" >
           <input onChange={(e) => setUserName(e.target.value)} value={userName} className="px-5 py-4 outline-0 rounded-3xl border border-[#717070] text-white text-[15px] placeholder:text-[#717070] focus:border-white" placeholder="Full Name" type="text" />
           <input onChange={(e) => setEmail(e.target.value)} value={email} className="px-5 py-4 outline-0 rounded-3xl border border-[#717070] text-white text-[15px] placeholder:text-[#717070] focus:border-white" placeholder="Email Address" type="text" />
           <input onChange={(e) => setPassword(e.target.value)} value={password} className="px-5 py-4 outline-0 rounded-3xl border border-[#717070] text-white text-[15px] placeholder:text-[#717070] focus:border-white" placeholder="Password" type="text" />
           <button className="px-5 py-4 outline-0 rounded-3xl border border-[#717070] bg-white text-black text-[15px]">Continue</button>
        </form>
         <p onClick={() => navigate(<Login/>)} className="text-sm font-[300] text-[#717070] text-center mb-5 cursor-pointer">Already have an account ? <span className="text-white">Login</span></p>
      </div>


    </div>
  )
}

export default Register