import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setUrl('')
    setAuthor('')
    setTitle('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2 className="sub-heading">Create new blog</h2>
      <div>
        <input
          placeholder="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <input
          placeholder="URL"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button>Save</button>
    </form>
  )
}

export default BlogForm
