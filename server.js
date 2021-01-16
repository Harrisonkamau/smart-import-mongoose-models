const PORT = process.env.PORT || 4000;
const { createApp } = require('./lib');

async function main() {
  try {
    const app = await createApp();

    app.listen(PORT, () => console.log(`Express server running on: http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = main();