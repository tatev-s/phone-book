const set = require('lodash/set');

module.exports = (ctx) => {
  if ((ctx.status >= 204 && ctx.status < 400) || ctx.status === 405 || !ctx.body) return;
  let result = ctx.body;
  if (result && result.dataValues) {
    result = result.dataValues;
  }
  const response = {};
  if (result.status && typeof result.status === 'number') {
    set(ctx, 'status', result.status);
    delete result.status;
  }
  if (!result.data && !result.meta) result.data = { ...result };
  if (!result.meta && result.data) result.meta = {};

  set(response, 'data', result.data);
  ctx.body = response;
};
