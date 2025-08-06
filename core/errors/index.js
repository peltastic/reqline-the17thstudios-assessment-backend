const ERROR_CODE = Object.freeze({
  NOT_FOUND: '404',
  BAD_REQUEST: '400',
  UNAUTHORIZED: '401',
  FORBIDDEN: '403',
  INTERNAL_SERVER_ERROR: '500',
  NOAUTHERR: 'NOAUTHERR',
});

class AppError extends Error {
  constructor(message, code = ERROR_CODE.INTERNAL_SERVER_ERROR) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

function throwAppError(message, code) {
  throw new AppError(message, code);
}

module.exports = {
  AppError,
  throwAppError,
  ERROR_CODE,
};
