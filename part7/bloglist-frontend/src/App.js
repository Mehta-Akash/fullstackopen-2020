import React, { useEffect, useState } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable.'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout, loginFromStorage } from './reducers/userReducer'
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import storage from './utils/storage'
import { initialiseBlogs } from './reducers/blogsReducer'
import userService from './services/users'
import SingleBlog from './components/SingleBlog'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [allUsers, setAllUsers] = useState('')
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

  useEffect(() => {
    const getUsers = async () => {
      const users = await userService.getAll()
      setAllUsers(users)
    }
    getUsers()
  }, [])

  const toggleBlogForm = () => {
    blogFormRef.current.toggleVisibility()
  }

  const match = useRouteMatch('/users/:id')
  let userToDisplay
  if (allUsers) {
    userToDisplay = match
      ? allUsers.find((user) => user.id === match.params.id)
      : null
  }

  const blogMatch = useRouteMatch('/blogs/:id')
  const singleBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

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

  const style = {
    backgroundColor: '#dddddd',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  }

  return (
    <div>
      <div style={style}>
        <h1>Blog App</h1>
        <Link to="/users">Users</Link>
        <Link to="/">Blogs</Link>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>

      <Notification />

      <Switch>
        <Route path="/users/:id">
          <User userToDisplay={userToDisplay} />
        </Route>
        <Route path="/users">
          <Users allUsers={allUsers} />
        </Route>
        <Route path="/blogs/:id">
          <SingleBlog singleBlog={singleBlog} />
        </Route>
        <Route path="/">
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
        </Route>
      </Switch>
    </div>
  )
}

export default App
