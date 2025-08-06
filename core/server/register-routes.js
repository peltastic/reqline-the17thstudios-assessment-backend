const fs = require('fs');
const path = require('path');
const http_statuses = require('./http-statuses');

function registerRoutes(app, endpointConfigs) {
  endpointConfigs.forEach((config) => {
    const { path: dirPath } = config;
    fs.readdirSync(dirPath).forEach((file) => {
      if (file.endsWith('.js')) {
        const route = require(path.join(process.cwd(), dirPath, file));
        const { path: routePath, method, handler } = route;
        app[method](routePath, async (req, res, next) => {
          try {
            const result = await handler(
              {
                body: req.body,
                query: req.query,
                headers: req.headers,
                params: req.params,
              },
              { http_statuses }
            );
            res.status(result.status || http_statuses.HTTP_200_OK).send(result.data);
          } catch (error) {
            next(error);
          }
        });
      }
    });
  });
}

module.exports = {
  registerRoutes,
};
