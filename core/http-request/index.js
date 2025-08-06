const axios = require('axios');

async function httpRequest(options) {
  try {
    const response = await axios(options);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(JSON.stringify(error.response.data));
    } else {
      throw error;
    }
  }
}

module.exports = httpRequest;
