import React, { useEffect, useState } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable.'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { loginFromStorage } from './reducers/userReducer'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import storage from './utils/storage'
import Header from './components/Header'
import { initialiseBlogs } from './reducers/blogsReducer'
import userService from './services/users'
import SingleBlog from './components/SingleBlog'
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Grid
} from '@material-ui/core'

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

  if (!user) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Header />

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

          <Grid container>
            <Grid xs={false} sm={2} md={3} />
            <Grid xs={12} sm={8} md={6}>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {blogs.sort(byLikes).map((blog) => (
                      <TableRow>
                        <TableCell>
                          <Blog
                            key={blog.id}
                            blog={blog}
                            own={user.username === blog.user.username}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid xs={false} sm={2} md={3} />
          </Grid>
        </Route>
      </Switch>
    </div>
  )
}

export default App
