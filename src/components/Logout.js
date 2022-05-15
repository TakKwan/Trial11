import { useNavigate } from "react-router-dom"


const Logout = ({ setUser }) => {
  const navigate = useNavigate()
  setUser(null)
  localStorage.clear()
  navigate('/')
}

export default Logout