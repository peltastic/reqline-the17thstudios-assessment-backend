const { URL, URLSearchParams } = require('url');
const { throwAppError } = require('../../core/errors');
const httpRequest = require('../../core/http-request');
const messages = require('../../messages/reqline');

function parse(reqline) {
  const parts = reqline.split(' | ');
  if (parts.length < 2) {
    throwAppError(messages.INVALID_SPACING);
  }

  const result = {
    method: '',
    url: '',
    headers: {},
    query: {},
    body: {},
  };

  if (!parts[0].startsWith('HTTP ')) {
    throwAppError(messages.MISSING_HTTP);
  }
  if (!parts[1].startsWith('URL ')) {
    throwAppError(messages.HTTP_URL_ORDER);
  }

  for (const part of parts) {
    const firstSpaceIndex = part.indexOf(' ');
    if (firstSpaceIndex === -1) {
      throwAppError(messages.MISSING_SPACE_AFTER_KEYWORD);
    }

    const keyword = part.substring(0, firstSpaceIndex);
    const value = part.substring(firstSpaceIndex + 1);

    if (keyword !== keyword.toUpperCase()) {
      throwAppError(messages.UPPERCASE_KEYWORDS);
    }

    switch (keyword) {
      case 'HTTP':
        if (value !== 'GET' && value !== 'POST') {
          throwAppError(messages.INVALID_METHOD);
        }
        result.method = value;
        break;
      case 'URL':
        result.url = value;
        break;
      case 'HEADERS':
        try {
          result.headers = JSON.parse(value);
        } catch (e) {
          throwAppError(messages.INVALID_JSON_HEADERS);
        }
        break;
      case 'QUERY':
        try {
          result.query = JSON.parse(value);
        } catch (e) {
          throwAppError(messages.INVALID_JSON_QUERY);
        }
        break;
      case 'BODY':
        try {
          result.body = JSON.parse(value);
        } catch (e) {
          throwAppError(messages.INVALID_JSON_BODY);
        }
        break;
      default:
        // Unknown keyword, or handle as an error
        break;
    }
  }

  return result;
}

async function parseAndExecute(reqline) {
  const parsedRequest = parse(reqline);

  const url = new URL(parsedRequest.url);
  const searchParams = new URLSearchParams(parsedRequest.query);
  url.search = searchParams.toString();

  const fullUrl = url.toString();

  const requestOptions = {
    method: parsedRequest.method,
    url: fullUrl,
    headers: parsedRequest.headers,
    data: parsedRequest.body,
  };

  const request_start_timestamp = Date.now();
  const response = await httpRequest(requestOptions);
  const request_stop_timestamp = Date.now();
  const duration = request_stop_timestamp - request_start_timestamp;

  return {
    request: {
      query: parsedRequest.query,
      body: parsedRequest.body,
      headers: parsedRequest.headers,
      full_url: fullUrl,
    },
    response: {
      http_status: response.status,
      duration,
      request_start_timestamp,
      request_stop_timestamp,
      response_data: response.data,
    },
  };
}

module.exports = parseAndExecute;
