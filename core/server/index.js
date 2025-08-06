const express = require('express');
const http = require('http');
const { appLogger } = require('../logger');
const { AppError, ERROR_CODE } = require('../errors');
const { registerRoutes } = require('./register-routes');
const http_statuses = require('./http-statuses');

function createHandler(handlerConfig) {
  return { ...handlerConfig };
}

function createApp(endpointConfigs) {
  const app = express();
  app.use(express.json());

  registerRoutes(app, endpointConfigs);

  app.use((err, req, res, next) => {
    if (err instanceof AppError) {
      const { code, message } = err;
      const statusCode =
        code === ERROR_CODE.NOT_FOUND
          ? http_statuses.HTTP_404_NOT_FOUND
          : http_statuses.HTTP_400_BAD_REQUEST;
      res.status(statusCode).send({ error: true, message });
    } else {
      appLogger.error(err);
      res
        .status(http_statuses.HTTP_500_INTERNAL_SERVER_ERROR)
        .send({ error: true, message: 'Internal Server Error' });
    }
  });

  const server = http.createServer(app);
  return { app, server };
}

module.exports = {
  createApp,
  createHandler,
  http_statuses,
};
