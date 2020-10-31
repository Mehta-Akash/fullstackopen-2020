import React from 'react';
const Blog = ({ blog }) => (
  <div className="blogContainer">
    <h3 className="blogTitle">{blog.title}</h3>
    <p className="blogAuthor">
      <b>Author: </b>
      {blog.author}
    </p>
    <p className="blogUrl">
      <b>URL:</b> <a hrerf="/#">{blog.url}</a>
    </p>
    <p className="blogLikes">Likes: {blog.likes}</p>
  </div>
);

export default Blog;
