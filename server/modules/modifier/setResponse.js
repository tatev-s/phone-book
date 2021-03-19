// eslint-disable-next-line no-underscore-dangle
const _set = require('lodash/set');

module.exports = (ctx, result, statusCode) => {
  _set(ctx.body, 'status', statusCode);
  ctx.body = result;
};
