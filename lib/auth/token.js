const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const config = require('config');
const { AuthenticationError } = require('../errors');

const JWT_SIGNING_SECRET = config.get('jwt.secret');

if (!JWT_SIGNING_SECRET) {
  throw new AuthenticationError('Missing JWT_SIGNING_SECRET');
}

const asyncJwtVerify = promisify(jwt.verify);
const asyncJwtSign = promisify(jwt.sign);

async function verifyJwt(token) {
  try {
    const result = await asyncJwtVerify(token, JWT_SIGNING_SECRET);
    return result;
  } catch (error) {
    throw new AuthenticationError(`UnAuthenticated user: ${error.message}`);
  }
}

async function generateToken(payload = {}) {
  try {
    const { userId, role } = payload;
    const token = await asyncJwtSign(
      {
        data: { userId, role },
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // expires in an hour
        issuer: 'smart-models-inc',
      },
      JWT_SIGNING_SECRET,
    );
    return token;
  } catch (error) {
    throw new AuthenticationError(`Token could not be generated: ${error.message}`);
  }
}

module.exports = {
  verifyJwt,
  generateToken,
};
