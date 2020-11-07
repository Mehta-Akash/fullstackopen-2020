import React, { useState } from 'react'

const LoginForm = ({ loginHandler }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    loginHandler({
      username,
      password,
    })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          placeholder="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          placeholder="Password"
          onChange={({ target }) => {
            setPassword(target.value)
          }}
        />
      </div>
      <div>
        <button id="login-button">Log in</button>
      </div>
    </form>
  )
}

export default LoginForm
