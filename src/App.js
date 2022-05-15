import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getUser, logoutUser } from "./services/index"
import components from "./components"
import Navbar from "./components/Navbar"


function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchUser()
  }, [user])

  const PrivateOutlet = () => {
    if (user)
      return <Outlet />
    else
      <Navigate to="/login" />
  }

  const fetchUser = async () => {
    if (user) return;
    const userPayload = await getUser()
    if (userPayload) {
      setUser(userPayload)
    }
  }

  const logout = () => {
    setUser(null)
    logoutUser()
    navigate('/')
  }

  return (
    <div className="App">
      <Navbar user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<components.Home />} />
        <Route path="/register" element={<components.Register setUser={setUser} />} />
        <Route path="/login" element={<components.Login setUser={setUser} />} />
        <Route path="/parkdetails/:parkCode" element={<components.ParkDetails user={user} updateUser={setUser} />} />
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
