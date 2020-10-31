import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Footer from './components/Footer';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notifier = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      notifier(`Welcome ${user.name}`);
    } catch (exception) {
      notifier('Wrong username or password');
      console.log(exception);
    }
  };

  const addBLog = async (e) => {
    e.preventDefault();

    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      });
      setBlogs(blogs.concat(blog));
      notifier(`A new blog ${title} by ${author} has been added`);
      setUrl('');
      setAuthor('');
      setTitle('');
    } catch (exception) {
      notifier(`A new blog could not be added: make sure to fill all items`);
      console.log(exception);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  const loginForm = () => (
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

  const blogForm = () => (
    <form onSubmit={addBLog}>
      <div>
        <input
          placeholder="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <input
          placeholder="URL"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button>Save</button>
    </form>
  );

  return (
    <div className="pageContainer">
      <h2 className="heading">Blogs Website</h2>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div className="username">
            <p>{user.name} is loged in</p>
            <button onClick={() => logout()}>logout</button>
          </div>
          <h2 className="sub-heading">Create new blog</h2>
          {blogForm()}
          <div className="cards">
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
