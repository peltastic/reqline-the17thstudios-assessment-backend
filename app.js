require('dotenv').config();
const { createApp } = require('./core/server');

const ENDPOINT_CONFIGS = [{ path: './endpoints/reqline/' }];

const { server } = createApp(ENDPOINT_CONFIGS);

const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
