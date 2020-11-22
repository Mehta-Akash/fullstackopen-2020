import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { increaseLike, removeBlog } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog, own }) => {
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const label = visible ? 'hide' : 'view'

  const handleLike = async (id) => {
    const blogToLike = blogs.find((b) => b.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    }
    dispatch(increaseLike(likedBlog))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find((b) => b.id === id)
    const ok = window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
    )
    if (ok) {
      dispatch(removeBlog(blogToRemove))
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        <Link to={`/blogs/${blog.id}`}>
          <i>{blog.title}</i> by {blog.author}{' '}
        </Link>
        {/* <button onClick={() => setVisible(!visible)}>{label}</button> */}
      </div>
      {/* {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={() => handleLike(blog.id)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
        </div>
      )} */}
    </div>
  )
}

// Blog.propTypes = {
//   blog: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     author: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
//   }).isRequired,
//   handleLike: PropTypes.func.isRequired,
//   handleRemove: PropTypes.func.isRequired,
//   own: PropTypes.bool.isRequired,
// }

export default Blog
