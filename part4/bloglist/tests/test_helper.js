const Blog = require('../models/blog');

const initialBlog = [
  {
    title: 'Waking up',
    author: 'Sam Harris',
    url: 'https://samharris.org/',
    likes: 10,
    id: '5f88a6f21fa2dee9dd972da3',
  },
  {
    title: 'Conversations with Coleman',
    author: 'Coleman Hughes',
    url: 'https://colemanhughes.org/',
    likes: 5,
    id: '5f88a73c50dd4dea39f73072',
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlog,
  blogsInDb,
};
