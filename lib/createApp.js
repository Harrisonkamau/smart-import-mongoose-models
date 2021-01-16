const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('../routes');

async function createApp() {
  try {
    const app = express();

    // register middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(cors({
      origin: '*', // whitelist domains if you need to
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }));


    // register routes
    routes.forEach(r => app.use(r));

    return app;
  } catch (error) {
    console.log('An error while creating Express app');
    process.exit(1);
  }
}

module.exports = createApp;
