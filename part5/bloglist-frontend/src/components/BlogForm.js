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
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <h2 className="sub-heading">Create new blog</h2>
        <div>
          <input
            placeholder="Title"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Author"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <input
            placeholder="URL"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button>Save</button>
      </form>
    </div>
  )
}

export default BlogForm
