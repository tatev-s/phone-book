// const logger = require('../../modules/logger');
const { responseModifier, errorModifier } = require('../../modules/modifier');

module.exports = async (ctx, next) => {
  try {
    await next();
    responseModifier(ctx);
  } catch (ex) {
    const error = errorModifier(ctx, ex).getError();
    ctx[error.statusName]({ error });
  }
};
