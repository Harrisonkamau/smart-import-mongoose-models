const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const { AuthenticationError } = require('../../lib/errors');

const asyncCompare = promisify(bcrypt.compare);

async function compareHash(str, hash) {
  try {
    const result = await asyncCompare(str, hash);

    return result;
  } catch (error) {
    throw new AuthenticationError(error.message);
  }
}

module.exports = (userSchema) => {
  userSchema.methods.comparePassword = function comparePassword(str) { // eslint-disable-line
    const hash = this.get('password');
    return compareHash(str, hash);
  };

  userSchema.methods.isAdmin = function isAdmin() { // eslint-disable-line
    const ADMIN_ROLES = Object.freeze(['owner', 'coach']);
    return ADMIN_ROLES.includes(this.get('role'));
  };
};
