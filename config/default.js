require('dotenv').config();
const { logger } = require('loggery');

const { BCRYPT_SALT_ROUNDS } = process.env;

if (!BCRYPT_SALT_ROUNDS) {
  logger().error('Bcrypt SALT ROUNDS NOT provided!');
}

module.exports = {
  app: {
    logRequests: false,
  },
  bcrypt: {
    salt: Number(BCRYPT_SALT_ROUNDS),
  },
};
