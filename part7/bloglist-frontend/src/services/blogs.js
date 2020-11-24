import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = 'http://localhost:3001/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (blog) => {
  const request = axios.post(baseUrl, blog, getConfig())
  return request.then((response) => response.data)
}

const update = (blog) => {
  const request = axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
  return request.then((response) => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, getConfig())
  return request.then((response) => response.data)
}

const addComment = (comments, id) => {
  const comment = {
    comment: comments,
  }
  const request = axios.post(`${baseUrl}/${id}/comments`, comment)
  return request.then((res) => res.data)
}

export default { getAll, create, update, remove, addComment }
