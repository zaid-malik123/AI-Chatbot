import { IoIosArrowDown } from "react-icons/io";
import { RiUserAddLine } from "react-icons/ri";
import { FiMessageCircle } from "react-icons/fi";
import Chats from "./Chats";

const TextArea = () => {
  return (
    // Use column layout and allow children to stretch to full height so the
    // messages container can expand and scroll while the header stays fixed.
    <div className="w-[80%] h-full relative flex flex-col">
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

        {/* pad the top so the absolute header doesn't overlap content */}
        <div className="h-full pt-20 flex items-center justify-center">
          <Chats />
        </div>

    </div>
  )
}

export default TextArea