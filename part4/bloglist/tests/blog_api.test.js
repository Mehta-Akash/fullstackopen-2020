const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

const initalBlog = [
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

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = initalBlog.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs returned as json and returns correct amount', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initalBlog.length);
});

test('id is the unique identifier', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

test('a valid blog can be added', async () => {
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

  const response = await api.get('/api/blogs');
  const title = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initalBlog.length + 1);
  expect(title).toContain('Mindscape');
});

test.only('if likes property is empty, defaults to 0', async () => {
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
  expect(response.body[initalBlog.length].likes).toBe(0);
});

afterAll(() => {
  mongoose.connection.close();
});
