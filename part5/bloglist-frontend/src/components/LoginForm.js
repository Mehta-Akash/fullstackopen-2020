import React from 'react';

const LoginForm = ({username, password, setUsername, setPassword, handleLogin}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type="text"
          value={username}
          name="Username"
          placeholder="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          name="Password"
          placeholder="Password"
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />
      </div>
      <div>
        <button>Log in</button>
      </div>
    </form>
  );
};

export default LoginForm;
