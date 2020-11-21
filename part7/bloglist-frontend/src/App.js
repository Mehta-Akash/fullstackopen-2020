import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable.'
import NewBlog from './components/NewBlog'
import { useDispatch, useSelector } from 'react-redux'
// import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'

import { setNotification } from './reducers/notificationReducer'
import { initialiseBlogs } from './reducers/blogsReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initialiseBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const notifyWith = (message) => {
    dispatch(setNotification(message))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      setUsername('')
      setPassword('')
      setUser(user)
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch (exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const toggleBlogForm = () => {
    blogFormRef.current.toggleVisibility()
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login">login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog toggleBlogForm={toggleBlogForm} />
      </Togglable>

      {blogs.sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          own={user.username === blog.user.username}
        />
      ))}
    </div>
  )
}

export default App
