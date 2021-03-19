const Validator = require('fastest-validator');

const FV = new Validator();
const exceptions = require('../exceptions/index');

module.exports = (target, schema) => {
  const validated = FV.validate(target, schema);
  if (Array.isArray(validated)) {
    throw new exceptions.InvalidUserInput(validated);
  }
};
