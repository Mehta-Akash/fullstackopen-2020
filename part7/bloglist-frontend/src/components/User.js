import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ userToDisplay }) => {
  const style = {
    paddingLeft: '2rem',
  }
  if (!userToDisplay) {
    return null
  }

  return (
    <div>
      <h2>{userToDisplay.name}</h2>
      <h3>Added blogs</h3>
      <div style={style}>
        {userToDisplay.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </div>
    </div>
  )
}
export default User
