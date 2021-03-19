/* eslint-disable no-param-reassign */
const { SEQUELIZE_ERRORS } = require('../exceptions/constants');
const {
  SequelizeError, BaseError, InternalServerError
} = require('../exceptions');

function normalizeError(exception) {
  if (SEQUELIZE_ERRORS[exception.name]) {
    return new SequelizeError(exception);
  }
  return exception;
}

module.exports = (ctx, exception) => {
  exception = normalizeError(exception);
  if (exception instanceof BaseError) {
    if (!Array.isArray(exception.details)) exception.details = [exception.details];
    return exception;
  }
  return new InternalServerError();
};
