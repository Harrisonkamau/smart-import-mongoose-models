class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'AuthenticationError';
  }
}

module.exports = AuthenticationError;
