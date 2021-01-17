class JoiValidationError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'JoiValidationError';
  }
}

module.exports = JoiValidationError;
