import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseLike } from '../reducers/blogsReducer'

const SingleBlog = ({ singleBlog }) => {
//   console.log('SingleBlog', singleBlog)
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()
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
  return (
    <div>
      <h2>{singleBlog.title}</h2>
      <a href={singleBlog.url}>{singleBlog.url}</a>
      <div>
        {singleBlog.likes} likes
        <button onClick={() => handleLike(singleBlog.id)}>Like</button>
      </div>

      <p>Added by {singleBlog.user.name}</p>
    </div>
  )
}

export default SingleBlog
