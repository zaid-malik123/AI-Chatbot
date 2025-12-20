import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login";
import  Register  from "./components/Register";
const App = () => {

  
  return (
    <div className="w-screen h-screen bg-[#212121] text-text flex">   
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* Chat route shows same Home layout but provides chatId param */}
        <Route path="/c/:chatId" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>  
    </div>
  );
};

export default App;
