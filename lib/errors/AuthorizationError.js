class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'AuthorizationError';
  }
}

module.exports = AuthorizationError;
