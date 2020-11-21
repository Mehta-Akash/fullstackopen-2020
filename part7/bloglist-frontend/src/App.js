import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable.'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout, loginFromStorage } from './reducers/userReducer'
// import blogService from './services/blogs'

import storage from './utils/storage'
import { initialiseBlogs } from './reducers/blogsReducer'

const App = () => {
  // const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initialiseBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      dispatch(loginFromStorage(user))
    }
  }, [dispatch])

  const toggleBlogForm = () => {
    blogFormRef.current.toggleVisibility()
  }

  const handleLogout = () => {
    dispatch(userLogout())
    storage.logoutUser()
  }

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>
        <Notification />
        <LoginForm />
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
