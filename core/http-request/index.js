const axios = require('axios');

async function httpRequest(options) {
  try {
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = httpRequest;
