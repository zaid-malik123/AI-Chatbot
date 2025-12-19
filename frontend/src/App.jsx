import Sidebar from "./components/Sidebar";
import { IoIosArrowDown } from "react-icons/io";
import { RiUserAddLine } from "react-icons/ri";
import { FiMessageCircle } from "react-icons/fi";
const App = () => {

  
  return (
    <div className="w-screen h-screen bg-[#212121] text-text flex">
      
      <Sidebar/>

      <div className="w-[80%] h-full ">
         <header className="w-full flex items-center justify-between p-5">
            <div className="flex text-white items-center gap-2">
               <h2 className="text-xl font-[300]">Nova</h2>
               <IoIosArrowDown size={20} />
            </div>
            <div className="flex items-center gap-4">
              <RiUserAddLine size={20} color="white" />
              <FiMessageCircle size={20} color="white" />
            </div>
         </header>
      </div>
    </div>
  );
};

export default App;
