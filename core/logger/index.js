const pino = require('pino');

const appLogger = pino({
  level: 'info',
});

const timeLogger = pino({
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level(label) {
      return { level: label };
    },
    log(obj) {
      return {
        ...obj,
        duration: obj.duration,
      };
    },
  },
});

module.exports = {
  appLogger,
  timeLogger,
};
