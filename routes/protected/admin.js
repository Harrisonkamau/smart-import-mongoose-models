/**
 * these routes allow you to either
 * - create a new admin or
 * - elevating an existing user's role to that of an Admin
 *
 */

const express = require('express');
const { celebrate } = require('celebrate');
const {
  userSchemas: { userRegistrationSchema, adminRoleSchema },
} = require('../schemas');
const { User } = require('../../models');
const { authenticateRequest } = require('../middleware');
const logger = require('../../lib/logger');

const router = express.Router();

router.post(
  '/admins/create',
  authenticateRequest,
  celebrate({ body: userRegistrationSchema }),
  async (req, res) => {
    try {
      const user = req.body;
      const existingUser = await User.findOne({ email: user.email });

      if (existingUser) {
        res
          .status(422)
          .json({ error: `User with email: ${user.email} already exists` });
      } else {
        const newUser = new User(user);

        newUser.role = 'owner';
        await newUser.save();

        const sanitizedAdmin = User.sanitizeAdmin(newUser);

        logger.info(`New User with Admin rights created: ${sanitizedAdmin}`);

        res.status(201).json(sanitizedAdmin);
      }
    } catch (error) {
      logger.error(`Could not register a user: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  },
);

router.post(
  '/admins/update-role',
  authenticateRequest,
  celebrate({ body: adminRoleSchema }),
  async (req, res) => {
    try {
      const { email } = req.body;
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        res.status(200).json({ error: `user with email: ${email} not found` });
      } else {
        // elevate permissions to admin level
        existingUser.set('role', 'owner');
        await existingUser.save();

        const sanitizedAdmin = User.sanitizeAdmin(existingUser);
        logger.info(`Admin rights granted: ${sanitizedAdmin}`);
        res.status(200).json(sanitizedAdmin);
      }
    } catch (error) {
      logger.error(`Could not update user role a user: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  },
);

module.exports = router;
