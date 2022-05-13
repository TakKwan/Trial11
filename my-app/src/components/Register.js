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
    <div className="register container">
      <form onSubmit={onSubmit}>
        <h3>Name</h3>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={userBody.username}
          onChange={onChange}
        />
        <h3>Email</h3>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={userBody.email}
          onChange={onChange}
        />
        <h3>Password</h3>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userBody.password}
          onChange={onChange}
        />
        <h3>Confirm Password</h3>
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
          }}
        />
        <button
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