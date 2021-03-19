const Router = require('koa-router');
const { RESOURCE_NOT_FOUND } = require('../../utils/errorDetails');
const { ResourceNotFoundError } = require('../../modules/exceptions');
const PhoneBookService = require('../services/phoneBook');
const validate = require('../../modules/validator');
const { createPhoneBookSchema, updatePhoneBookSchema } = require('../../modules/validator/schemas');
const { PAGINATION } = require('../../utils/constants');
const { sequelize } = require('../../data/models');

const router = new Router({
  prefix: '/phoneBooks'
});

router.post('/', async (ctx) => {
  await validate(ctx.request.body, createPhoneBookSchema);
  const transaction = await sequelize.transaction();
  const result = await PhoneBookService.create({ data: ctx.request.body, transaction });
  return ctx.created(result);
});
router.post('/import', async (ctx) => {
  const result = await PhoneBookService.import({ file: { ...ctx.request.files } });
  console.log({ result });
  return ctx.created(result);
});
router.patch('/:id', async (ctx) => {
  await validate(ctx.request.body, updatePhoneBookSchema);
  const { id } = ctx.params;
  const transaction = await sequelize.transaction();
  const result = await PhoneBookService.update({ data: { ...ctx.request.body }, id, transaction });

  return ctx.accepted(result);
});

router.delete('/:id', async (ctx) => {
  const { id } = ctx.params;

  await PhoneBookService.delete({ id });

  return ctx.noContent();
});

router.get('/', async (ctx) => {
  const { limit = PAGINATION.LIMIT, offset = PAGINATION.OFFSET, search } = ctx.request.query;
  const result = await PhoneBookService.get({ limit, offset, search });

  return ctx.ok(result);
});

router.get('/:id', async (ctx) => {
  const { id } = ctx.params;

  const result = await PhoneBookService.getById({ id });
  if (!result) throw new ResourceNotFoundError(RESOURCE_NOT_FOUND);

  return ctx.ok(result);
});

module.exports = router;
