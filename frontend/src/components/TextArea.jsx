import { IoIosArrowDown } from "react-icons/io";
import { RiUserAddLine } from "react-icons/ri";
import { FiMessageCircle } from "react-icons/fi";
import Chats from "./Chats";

const TextArea = () => {
  return (
    <div className="w-[80%] h-full relative flex items-center justify-center">
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
         
         <Chats/>
         
      </div>
  )
}

export default TextArea