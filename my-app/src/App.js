import Navbar from "./components/Navbar"
import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import components from "./components"
import { CheckSession } from "./services/index"


function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const checkToken = async () => {
    const respond = await CheckSession()
    setUser(respond)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  const PrivateOutlet = () => {
    return user ? <Outlet /> : <Navigate to="/" />
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
        <Route path="/parkdetails/:parkCode" element={<components.ParkDetails userId={user} />} />
        <Route path="/" element={<PrivateOutlet />} >
          <Route path="/watchlist" element={user && <components.Watchlist userId={user.id} />} />
          <Route path="/favorites" element={user && <components.Favorites userId={user.id} />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
