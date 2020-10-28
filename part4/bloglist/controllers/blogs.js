const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/users');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  const { body } = request;

  if (!body.likes) {
    request.body.likes = 0;
  }

  const user = await User.findById('5f993c22d539d1fd661b7377');

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });
  // const blog = new Blog(body);
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog.toJSON());
});

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { body } = request;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const blogUpdate = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(blogUpdate);
});

module.exports = blogsRouter;
