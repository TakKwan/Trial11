import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../services"

const Register = ({ setUser }) => {
  const navigate = useNavigate()
  const [userBody, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [confirmPassword, setConfirmPassword] = useState('')

  const onChange = (e) => {
    setForm({
      ...userBody,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const user = await register({
      username: userBody.username,
      email: userBody.email,
      password: userBody.password
    })
    clearUserBody()
    navigate('/')
    setUser(user)
  }

  const clearUserBody = () => {
    setForm({
      username: '',
      email: '',
      password: ''
    })
  }

  return (
    <div className="registerContainer">
      <form className="registerForm" onSubmit={onSubmit}>
        <h3 className="registerTitle">Sign Up</h3>
        <input
          className="registerInput"
          type="text"
          placeholder="Username"
          name="username"
          value={userBody.username}
          onChange={onChange}
        />
        <input
          className="registerInput"
          type="email"
          placeholder="Email"
          name="email"
          value={userBody.email}
          onChange={onChange}
        />
        <input
          className="registerInput"
          type="password"
          placeholder="Password"
          name="password"
          value={userBody.password}
          onChange={onChange}
        />
        <input
          className="registerInput"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
          }}
        />
        <button
          className="resgisterButton"
          type="submit"
          disabled={
            !userBody.username ||
            !userBody.email ||
            !userBody.password ||
            confirmPassword !== userBody.password
          }
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Register