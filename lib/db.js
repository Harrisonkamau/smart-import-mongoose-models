const mongoose = require('mongoose');
const logger = require('./logger');

const { NODE_ENV } = process.env;

mongoose.Promise = global.Promise;

mongoose.connection.on('error', (error) => {
  logger.error(`Could not to MongoDB: ${error.message}`);
});

mongoose.connection.on('open', (error) => {
  if (error) {
    logger.error(`Could not to MongoDB: ${error.message}`);
  }

  if (NODE_ENV !== 'test') {
    const mongoClient = mongoose.connection.getClient();
    logger.info(`Connected to MongoDB URL: "${mongoClient.s.url}"`);
  }
});

class Db {
  constructor(url = 'mongodb://localhost/smart-import-db') {
    this.url = url;
  }

  // instance methods
  async connect() {
    try {
      const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
      await mongoose.connect(this.url, options);
    } catch (error) {
      logger.error('Error', error);
    }
  }

  // Class methods
  static async dropDatabase() {
    try {
      if (this.isConnected()) {
        await mongoose.connection.dropDatabase();
        logger.info('DB dropped');
      }
    } catch (error) {
      logger.error(`Could not drop DB: ${error.message}`);
    }
  }

  static isConnected() {
    return mongoose.connection.readyState === 1;
  }

  static async awaitConnection() {
    await new this(this.url).connect();
  }
}

module.exports = Db;
