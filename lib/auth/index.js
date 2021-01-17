const hashPassword = require('./hashPassword');
const { generateToken } = require('./token');

module.exports = {
  hashPassword,
  generateToken,
};
