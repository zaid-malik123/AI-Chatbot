import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import Register from "./Register"
import Sidebar from "../components/Sidebar"
import TextArea from "../components/TextArea"
import Login from "../components/Login"

const Home = () => {
  const { user } = useSelector(state => state.userSlice)
  const [authView, setAuthView] = useState(null) // 'login' | 'register' | null

  useEffect(() => {
    // If user is not present, show login overlay by default
    if (!user || !user.email) {
      setAuthView('login')
    } else {
      setAuthView(null)
    }
  }, [user])

  return (
    <div className="w-full h-full flex ">

        {/* Conditionally render auth overlays on top of the Home UI */}
        {authView === 'login' && (
          <Login onSwitch={(v) => setAuthView(v)} />
        )}
        {authView === 'register' && (
          <Register onSwitch={(v) => setAuthView(v)} />
        )}

        <Sidebar/>
        <TextArea/>
    </div>
  )
}

export default Home