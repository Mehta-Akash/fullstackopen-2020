import React from 'react';

const BlogForm = ({
  addBlog,
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
}) => {
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
  );
};

export default BlogForm;
