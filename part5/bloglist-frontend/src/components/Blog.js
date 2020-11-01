import React, { useState } from 'react';

const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const increaseLike = () => {
    const likes = blog.likes + 1;
    updateLikes({
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes,
      id: blog.id,
    });
  };

  const deleteBlogFunction = () => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    console.log(confirm);
    if(confirm){
      deleteBlog(blog)
    }
    // return confirm ? deleteBlog(blog) : null;
  };

  return (
    <div className="blogContainer">
      <h3 className="blogTitle">{blog.title}</h3>
      <button onClick={toggleVisibility}> {visible ? 'Hide' : 'View'} </button>
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
          <button onClick={increaseLike}>Like</button>
        </div>
        <div>
          {user.name === blog.user.name ? (
          <div>
            <button onClick={deleteBlogFunction}>Delete</button>
            </div>
          ): ""}
          
        </div>
      </div>
    </div>
  );
};

export default Blog;
