const config = require('config');
const { createApp, logger } = require('./lib');

const PORT = config.get('port');

async function main() {
  try {
    const app = await createApp();

    app.listen(PORT, () => logger.info(`Express server running on: http://localhost:${PORT}`));
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

module.exports = main();
