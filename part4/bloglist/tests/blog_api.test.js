const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlog.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs returned as json and returns correct amount', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlog.length);
});

test('id is the unique identifier', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

test.only('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Mindscape',
    author: 'Sean Carroll',
    url: 'https://www.preposterousuniverse.com/podcast/',
    likes: 7,
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const title = blogsAtEnd.map((r) => r.title);

  expect(blogsAtEnd).toHaveLength(helper.initialBlog.length + 1);
  expect(title).toContain('Mindscape');
});

test('if likes property is empty, defaults to 0', async () => {
  const newBlog = {
    title: 'Mindscape',
    author: 'Sean Carroll',
    url: 'https://www.preposterousuniverse.com/podcast/',
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  expect(response.body[helper.initialBlog.length].likes).toBe(0);
});

test('if title and url missing in post request, returns 400', async () => {
  const newBlog = {
    author: 'Sean Carroll',
    likes: 7,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
