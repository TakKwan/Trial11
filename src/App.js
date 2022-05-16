import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"
import { getUser, logoutUser } from "./services/index"
import components from "./components"
import Navbar from "./components/Navbar"

const PrivateOutlet = ({user, to = <Outlet />, fallback = <Navigate to="/" />}) => {
  if (user && to)
    return to
  else if (!user && fallback)
    return fallback
}

function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const fetchUser = useCallback(async () => {
    if (user) return;
    const userPayload = await getUser()
    if (userPayload) {
      setUser(userPayload)
    }
  }, [user, setUser])

  const logout = () => {
    setUser(null)
    logoutUser()
    navigate('/')
  }

  useEffect(() => {
    fetchUser()
  }, [user, fetchUser])

  return (
    <div className="App">
      <Navbar user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<components.Home />} />
        <Route path="/parkdetails/:parkCode" element={<components.ParkDetails user={user} updateUser={setUser} />} />
        <Route path="/results/:search" element={<components.Results />} />
        <Route path="/" element={<PrivateOutlet user={user} />} >
          <Route path="/register" element={<components.Register setUser={setUser} />} />
          <Route path="/login" element={<components.Login setUser={setUser} />} />
        </Route>
        <Route path="/" element={<PrivateOutlet user={user} fallback={<Navigate to="/login" />} />} >
          <Route path="/watchlist" element={user && <components.Watchlist user={user} />} />
          <Route path="/favorites" element={user && <components.Favorites user={user} />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
