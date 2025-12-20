import  Register  from "../components/Register"
import Sidebar from "../components/Sidebar"
import TextArea from "../components/TextArea"
import  Login  from "./Login"

const Home = () => {
  return (
    <div className="w-full h-full flex ">

        {/* <Register/> */}
        <Login/>
        <Sidebar/>
        <TextArea/>
    </div>
  )
}

export default Home