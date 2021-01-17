const { verifyJwt } = require('../../lib/auth');
const { User } = require('../../models');

module.exports = async (req, res, next) => {
  try {
    // check if token is set
    const { authorization } = req.headers;
    const [, accessToken] = authorization.split(' ');

    // check if token is valid
    const { data: { userId } } = await verifyJwt(accessToken);
    // retrieve user
    const user = await User.findOne({ _id: userId }).exec();

    // isAdmin() is defined in the user model: check models/user/methods.js
    if (!user.isAdmin()) {
      res.status(403).json({
        error: 'Request not authorized!',
      });
    }

    await next();
    // use role to check if user is admin
  } catch (error) {
    res.status(403).json({
      error: 'Request not authorized!',
    });
  }
};
