const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const config = require('config');
const { HashError } = require('../errors');

const BCRYPT_SALT_ROUNDS = config.get('bcrypt.salt');
const asyncHash = promisify(bcrypt.hash);
const asyncGenSalt = promisify(bcrypt.genSalt);

async function hashPassword(str) {
  try {
    const salt = await asyncGenSalt(BCRYPT_SALT_ROUNDS);
    const hash = await asyncHash(str, salt);
    return hash;
  } catch (error) {
    throw new HashError(error.message);
  }
}

module.exports = hashPassword;
