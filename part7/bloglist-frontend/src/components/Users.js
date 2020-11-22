import React from 'react'

import { Link } from 'react-router-dom'

const Users = ({ allUsers }) => {
  const mappedUsers = allUsers
    ? allUsers
        .map((user) => {
          let name = user.name
          let numberOfBlogs = user.blogs.length
          let id = user.id
          return [name, numberOfBlogs, id]
        })
        .sort()
    : null

  const headingStyle = {
    paddingLeft: '6rem',
  }
  const style = {
    float: 'left',
    paddingRight: '1rem',
  }

  return (
    <div>
      <h2>Users</h2>
      <h4 style={headingStyle}>Blogs created</h4>
      {mappedUsers
        ? mappedUsers.map((user) => (
            <div key={user[2]}>
              <Link style={style} to={`/users/${user[2]}`}>
                {user[0]}
              </Link>
              <p>{user[1]}</p>
            </div>
          ))
        : null}
    </div>
  )
}

export default Users
