const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const config = require('config');
const morgan = require('morgan');
const { publicRoutes, protectedRoutes } = require('../routes');
const Db = require('./db');
const logger = require('./logger');

async function createApp() {
  try {
    const app = express();

    // #### REGISTER APP's MIDDLEWARE #####
    // bodyParser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // Enable CORS
    app.use(cors({
      origin: '*', // whitelist domains if you need to
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }));

    // log requests for dev
    if (config.get('app.logRequests')) {
      app.use(morgan('dev'));
    }

    // register routes (NON-protected)
    publicRoutes.forEach((r) => app.use(r));

    // protected routes
    protectedRoutes.forEach((r) => app.use(r));

    // error middleware
    app.use(async (err, req, res, next) => {
      if (err) {
        // default to 500
        if (!err.statusCode) {
          err.statusCode = 500; // eslint-disable-line
        }

        return res.status(err.statusCode).send({
          statusCode: err.statusCode,
          message: err.message,
        });
      }

      await next();
    });

    // Custom 404 route not found handler
    app.use((req, res) => {
      res.status(404).json(
        'The page you are looking for does not exist. Go to / to see the Homepage',
      );
    });

    // Register Celebrate Errors (for handling routes schema validation errors)
    app.use(errors());

    // connect to DB
    await Db.awaitConnection();

    return app;
  } catch (error) {
    logger.error('An error while creating Express app', error);
    process.exit(1);
  }
}

module.exports = createApp;
