class HashError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'HashError';
  }
}

module.exports = HashError;
