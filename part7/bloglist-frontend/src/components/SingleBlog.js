import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseLike, addComment } from '../reducers/blogsReducer'
import blogService from '../services/blogs'

const SingleBlog = ({ singleBlog }) => {
  //   console.log('SingleBlog', singleBlog)
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  if (!singleBlog) {
    return null
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find((b) => b.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    }
    dispatch(increaseLike(likedBlog))
  }

  const handleComment = async (event) => {
    event.preventDefault()
    dispatch(addComment(comment, singleBlog.id))
    setComment('')
  }

  const style = {
    paddingLeft: '1rem',
  }

  return (
    <div>
      <h2>{singleBlog.title}</h2>
      <a href={singleBlog.url}>{singleBlog.url}</a>
      <div>
        {singleBlog.likes} likes
        <button onClick={() => handleLike(singleBlog.id)}>Like</button>
      </div>

      <p>Added by {singleBlog.user.name}</p>
      <h3>Comments</h3>

      <form onSubmit={handleComment}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button>Add comment</button>
      </form>

      {singleBlog.comments.map((comment, i) => (
        <li style={style} key={i}>
          {comment}
        </li>
      ))}
    </div>
  )
}

export default SingleBlog
