import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom"
import useGetCurrentUser from "./hooks/useGetCurrentUser";
const App = () => {

  useGetCurrentUser()
  return (
    <div className="w-screen h-screen bg-[#212121] text-text flex">   
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* Chat route shows same Home layout but provides chatId param */}
        <Route path="/c/:chatId" element={<Home/>} />
        
      </Routes>  
    </div>
  );
};

export default App;
