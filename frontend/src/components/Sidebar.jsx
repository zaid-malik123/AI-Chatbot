import { RiChatVoiceAiLine } from "react-icons/ri";
import { BsReverseLayoutSidebarReverse } from "react-icons/bs";
import { RxPencil2 } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";

const Sidebar = () => {
  const chat = [
    {name: "What is AI "},
    {name: "What is JS"}, 
    {name: "What is Data type"},
    {name: "What is AI "},
    {name: "What is JS"}, 
    {name: "What is Data type"},
    {name: "What is AI "},
    {name: "What is JS"}, 
    {name: "What is Data type"},
    {name: "What is AI "},
    {name: "What is JS"}, 
    {name: "What is Data type"},
    {name: "What is AI "},
    {name: "What is JS"}, 
    {name: "What is Data type"},
    {name: "What is AI "},
    {name: "What is JS"}, 
    {name: "What is Data type"},
    {name: "What is AI "},
    {name: "What is JS"}, 
    {name: "What is Data type"},
    {name: "What is AI "},
    {name: "What is JS"}, 
    {name: "What is Data type"},
    {name: "What is AI "},
    {name: "What is JS"}, 
    {name: "What is Data type"},
    {name: "What is AI "},
    {name: "What is JS"}, 
    {name: "What is Data type"},
    {name: "What is AI "},
    {name: "What is JS"}, 
    {name: "What is Data type"},
    {name: "What is AI "},
    {name: "What is JS"}, 
    {name: "What is Data type"},


  ]  
  return (
    <div className="w-[20%] h-full bg-[#171718] flex flex-col relative">
         <header className="w-full flex items-center justify-between p-5 ">
            <div>
              <RiChatVoiceAiLine color="white" size={25}/>
            </div>
            <div>
              <BsReverseLayoutSidebarReverse color="white" size={20} />
            </div>
         </header>

         <section className="w-full flex-1 mt-7 overflow-auto">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 px-5 py-2  hover:bg-[#212121] hover:rounded-xl">
                 <RxPencil2 color="white" size={18} />
                 <span className="text-white font-[200] text-sm">New Chat</span>
             </div>
             <div className="flex items-center gap-3 px-5 py-2  hover:bg-[#212121] hover:rounded-xl">
                <IoIosSearch color="white" size={18}/>
                <div className="text-white font-[200] text-sm">Search Chats</div>
             </div>
            </div>

           <div className="mt-5 flex flex-col gap-3 ">
              <h5 className="text-white/60 font-[400] text-sm ml-5">Your Chats</h5>
               <div>
                  {chat.map((chat) => (
                    <div className="flex items-center gap-3 px-5 py-2  hover:bg-[#212121] hover:rounded-xl">
        
                <div className="text-white font-[200] text-sm">{chat.name}</div>
             </div>
                  ))}
               </div> 
           </div>

           <div className="absolute bottom-0 left-0 flex gap-3 px-5 py-3 bg-[#171718] w-full hover:bg-[#212121]">
              <div className="w-10 h-10 rounded-full bg-orange-800 flex items-center justify-center text-w">
                 <h1>Z</h1>
              </div>
              <div className="text-white flex flex-col gap-1">
                <span className="font-[300] text-md">Zaid Malik</span>
                <span className="font-[300] text-sm">Free</span>
              </div>
           </div>
         </section>
      </div>
  )
}

export default Sidebar