import { IoIosArrowDown } from "react-icons/io";
import { RiUserAddLine } from "react-icons/ri";
import { FiMessageCircle } from "react-icons/fi";
import { FaArrowUp } from "react-icons/fa6";

const TextArea = () => {
  return (
    <div className="w-[80%] h-full relative flex items-center justify-center ">
         <header className="w-full flex items-center justify-between p-5 absolute top-0 left-0 z-50 bg-[#212121]">
            <div className="flex text-white items-center gap-2">
               <h2 className="text-xl font-[300]">Nova</h2>
               <IoIosArrowDown size={20} />
            </div>
            <div className="flex items-center gap-4">
              <RiUserAddLine size={20} color="white" />
              <FiMessageCircle size={20} color="white" />
            </div>
         </header>

         <div className="flex flex-col gap-10">
           <h2 className="text-white text-3xl text-center">What’s on the agenda today?</h2>
           <div className="w-2xl relative">
              <input className="w-full bg-[#303031] px-6 p-4 rounded-3xl text-white text-md outline-0 placeholder:text-white/50" type="text" placeholder="Ask anything" />
              <div className="absolute right-[20px] top-[8px] w-10 h-10 bg-white rounded-full flex items-center justify-center" >
                 <FaArrowUp />
              </div>
           </div>
         </div>
      </div>
  )
}

export default TextArea