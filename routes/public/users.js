const express = require('express');
const { celebrate } = require('celebrate');
const { User } = require('../../models');
const { AuthenticationError } = require('../../lib/errors');
const logger = require('../../lib/logger');
const { generateToken } = require('../../lib/auth');
const { authenticateRequest } = require('../middleware');
const { userSchemas: { userRegistrationSchema, userLoginSchema, getUserSchema } } = require('../schemas');

const router = express.Router();

router.post('/users/register', celebrate({ body: userRegistrationSchema }), async (req, res) => {
  try {
    const user = req.body;
    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      res.status(422).json({ error: `User with email: ${user.email} already exists` });
    } else {
      const newUser = new User(user);

      await newUser.save();

      const sanitizedUser = User.sanitize(newUser);
      logger.info(`New User created: ${JSON.stringify(sanitizedUser)}`);

      res.status(201).json(sanitizedUser);
    }
  } catch (error) {
    logger.error(`Could not register a user: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

router.get('/users', authenticateRequest, async (req, res) => {
  try {
    const users = await User.find().exec();

    if (users.length === 0) {
      res.status(200).json([]);
    } else {
      const sanitizedUsers = users.map((user) => User.sanitize(user));
      res.status(200).json(sanitizedUsers);
    }
  } catch (error) {
    logger.error(`Could not retrieve users: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

router.get('/users/:email', authenticateRequest, celebrate({ body: getUserSchema }), async (req, res) => {
  try {
    const { email } = req.params;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(404).json({
        error: `User with email: ${email} not found`,
      });
    } else {
      const sanitizedUser = User.sanitize(existingUser);
      res.status(200).json(sanitizedUser);
    }
  } catch (error) {
    logger.error(`Could not retrieve user by email: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

router.post('/users/login', celebrate({ body: userLoginSchema }), async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).json('User not found');
    } else {
      const isPasswordValid = await existingUser.comparePassword(password);

      if (!isPasswordValid) {
        throw new AuthenticationError('Either email or password is incorrect');
      }

      // authenticate & return token with user
      const token = await generateToken({ userId: existingUser._id, role: existingUser.role });
      const response = {
        token,
        user: User.sanitize(existingUser),
      };

      res.status(200).json(response);
    }
  } catch (error) {
    logger.error(`Could not login user: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
