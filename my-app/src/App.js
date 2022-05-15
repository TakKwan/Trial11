import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { checkSession } from "./services/index"
import components from "./components"
import Navbar from "./components/Navbar"


function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const fetchToken = async () => {
    const respond = await checkSession()
    //console.log("[App][fetchToken]", respond)
    setUser(respond)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchToken()
    }
  }, [])

  const PrivateOutlet = () => {
    return user ? <Outlet /> : <Navigate to="/login" />
  }

  const logout = () => {
    setUser(null)
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className="App">
      <Navbar user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<components.Home />} />
        <Route path="/register" element={<components.Register setUser={setUser} />} />
        <Route path="/login" element={<components.Login setUser={setUser} />} />
        <Route path="/parkdetails/:parkCode" element={<components.ParkDetails user={user} setUser={setUser} />} />
        <Route path="/results/:search" element={<components.Results />} />
        <Route path="/" element={<PrivateOutlet />} >
          <Route path="/watchlist" element={user && <components.Watchlist user={user} />} />
          <Route path="/favorites" element={user && <components.Favorites user={user} />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
