const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/users');

userRouter.post('/', async (request, response) => {
  const { body } = request;

  const saltRounds = 10;

  if (body.password.length < 3) {
    return response
      .status(400)
      .json({ error: 'password must be at least 3 characters long' });
  }
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

userRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = userRouter;
