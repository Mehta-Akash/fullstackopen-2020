import { Typography } from '@material-ui/core'
import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog, own }) => {
  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   // border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5,
  // }

  return (
    <div>
      <Typography align="center">
        <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>
          <i>{blog.title}</i> by {blog.author}{' '}
        </Link>
      </Typography>
    </div>
  )
}

export default Blog
