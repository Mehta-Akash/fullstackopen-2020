import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Footer from './components/Footer';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
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

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject);
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      notifier(`Welcome ${user.name}`);
    } catch (exception) {
      notifier('Wrong username or password');
    }
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const blog = await blogService.create(blogObject);
      setBlogs(blogs.concat(blog));
      notifier(
        `A new blog ${blogObject.title} by ${blogObject.author} has been added`
      );
    } catch (exception) {
      notifier(`A new blog could not be added: make sure to fill all items`);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  const loginForm = () => (
    <Togglable buttonLabel="Login">
      <LoginForm loginHandler={handleLogin} />
    </Togglable>
  );

  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
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
