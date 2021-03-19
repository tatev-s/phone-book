const Router = require('koa-router');
const { RESOURCE_NOT_FOUND } = require('../../utils/errorDetails');

const { ResourceNotFoundError } = require('../../modules/exceptions');

const GroupService = require('../services/group');
const validate = require('../../modules/validator');
const { createGroupSchema, updateGroupSchema } = require('../../modules/validator/schemas');
const { PAGINATION } = require('../../utils/constants');

const router = new Router({
  prefix: '/groups'
});

router.post('/', async (ctx) => {
  await validate(ctx.request.body, createGroupSchema);

  const result = await GroupService.create({ data: { ...ctx.request.body } });

  return ctx.created(result);
});

router.patch('/:id', async (ctx) => {
  await validate(ctx.request.body, updateGroupSchema);
  const { id } = ctx.params;

  const result = await GroupService.update({ data: { ...ctx.request.body }, id });

  return ctx.accepted(result);
});

router.delete('/:id', async (ctx) => {
  const { id } = ctx.params;

  await GroupService.delete({ id });

  return ctx.noContent();
});

router.get('/', async (ctx) => {
  const { limit = PAGINATION.LIMIT, offset = PAGINATION.OFFSET, search } = ctx.request.query;
  const result = await GroupService.get({ limit, offset, search });

  return ctx.ok(result);
});

router.get('/:id', async (ctx) => {
  const { id } = ctx.params;

  const result = await GroupService.getById({ id });
  if (!result) throw new ResourceNotFoundError(RESOURCE_NOT_FOUND);

  return ctx.ok(result);
});

module.exports = router;
