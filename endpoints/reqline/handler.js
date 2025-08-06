const { createHandler } = require('../../core/server');
const { throwAppError } = require('../../core/errors');
const parseAndExecute = require('../../services/reqline/parse-and-execute');

module.exports = createHandler({
  path: '/',
  method: 'post',
  async handler(rc, helpers) {
    const { reqline } = rc.body;

    if (!reqline || typeof reqline !== 'string') {
      throwAppError('Missing or invalid "reqline" in request body');
    }

    const result = await parseAndExecute(reqline);

    return {
      status: helpers.http_statuses.HTTP_200_OK,
      data: result,
    };
  },
});
