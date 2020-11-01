import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="blogContainer">
      <h3 className="blogTitle">{blog.title}</h3>
      <button onClick={toggleVisibility}> {visible ? 'Hide': 'View'} </button>
      <div style={showWhenVisible}>
        <p className="blogAuthor">
          <b>Author: </b>
          {blog.author}
        </p>
        <p className="blogUrl">
          <b>URL:</b> <a hrerf="/#">{blog.url}</a>
        </p>
        <p>User: {blog.user ? blog.user.name : ''}</p>
        <div>
          <p className="blogLikes">Likes: {blog.likes}</p>
          <button>like</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
