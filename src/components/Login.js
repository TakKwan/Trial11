import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { login } from '../services'

const Login = ({ setUser }) => {
  let navigate = useNavigate()
  const [userBody, setUserBody] = useState({
    email: '',
    password: ''
  })

  const onChange = (e) => {
    setUserBody({
      ...userBody,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const respond = await login(userBody)
    setUser(respond)
    setUserBody({ email: '', password: '' })
    navigate('/')
  }

  return (
    <div className="loginContainer">
      <form className="loginForm" onSubmit={onSubmit}>
        <h1 className='loginTitle'>Login</h1>
        <input
          className='loginInput'
          type="email"
          placeholder="Email"
          name="email"
          value={userBody.email}
          onChange={onChange}
        />
        <input
          className='loginInput'
          type="password"
          placeholder="Password"
          name="password"
          value={userBody.password}
          onChange={onChange}
        />
        <button className='loginButton' type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login