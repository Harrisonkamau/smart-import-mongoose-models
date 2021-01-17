module.exports = {
  NODE_ENV: 'development',
  app: {
    logRequests: true,
  },
  port: process.env.PORT || 4000,
  bcrypt: {
    salt: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
  },
  jwt: {
    secret: 'd41d8cd98f00b204e9800998ecf8427e',
  },
};
