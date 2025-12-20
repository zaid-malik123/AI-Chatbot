import { useSelector } from "react-redux"
import  Register  from "./Register"
import Sidebar from "../components/Sidebar"
import TextArea from "../components/TextArea"
import  Login  from "../components/Login"

const Home = () => {
  const { user } = useSelector(state => state.userSlice)

  return (
    <div className="w-full h-full flex ">
    
        {
          !user.email && <Login/>
        }
        
        <Sidebar/>
        <TextArea/>
    </div>
  )
}

export default Home