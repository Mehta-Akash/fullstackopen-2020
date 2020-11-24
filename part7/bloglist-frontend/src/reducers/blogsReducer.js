import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE':
      return state.map((x) => (x.id === action.data.id ? action.data : x))
    case 'REMOVE':
      const newState = state.filter((b) => b.id !== action.data.id)
      return newState
    case 'NEW_BLOG':
      const addedBlog = state.concat(action.data)
      return addedBlog
    case 'NEW_COMMENT':
      const updatedComment = state.map((b) =>
        b.id === action.data.id ? action.data : b
      )
      return updatedComment
    default:
      return state
  }
}

export const initialiseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const increaseLike = (likedBlog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(likedBlog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog,
    })
  }
}

export const removeBlog = (blogToRemove) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.remove(blogToRemove.id)
    dispatch({
      type: 'REMOVE',
      data: blogToRemove,
    })
  }
}

export const addBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const addComment = (comments, id) => {
  return async (dispatch) => {
    const comment = await blogService.addComment(comments, id)
    dispatch({
      type: 'NEW_COMMENT',
      data: comment,
    })
  }
}

export default reducer
