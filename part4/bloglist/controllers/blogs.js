const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  if (!request.body.likes) {
    request.body.likes = 0;
  }
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
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
