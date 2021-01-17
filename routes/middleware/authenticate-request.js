const mongoose = require('mongoose');
const { verifyJwt } = require('../../lib/auth');
const { AuthenticationError } = require('../../lib/errors');
const { User } = require('../../models');

module.exports = async (req, res, next) => {
  try {
    // check for headers
    const { headers } = req;

    const hasAuthorization = Object.hasOwnProperty.call(headers, 'authorization');

    if (!hasAuthorization || req.headers.authorization === '') {
      res.status(401).json({ error: 'Missing Token' });
    }

    // check if token is set
    const { authorization } = req.headers;
    const [, accessToken] = authorization.split(' ');

    if (!accessToken) {
      res.status(401).json({ error: 'Missing Token' });
    }

    // check if token is valid
    const { data: { userId, role } } = await verifyJwt(accessToken);

    if (!userId && !role) {
      res.status(401).json({ error: 'Invalid token' });
    }

    // check if ID is a valid mongoID
    // if invalid,do NOT disclose the user issue (instead invalidate the request)
    if (!mongoose.isValidObjectId(userId)) {
      res.status(401).json({ error: 'Invalid token' });
    }

    const existingUser = await User.findOne({ _id: userId }).exec();

    // check the user in the token is still in our DB
    if (!existingUser) {
      res.status(401).json({ error: 'Invalid token' });
    }

    await next();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      res.status(401).json({ error: 'Invalid token' });
    }
  }
};
