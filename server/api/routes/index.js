const Router = require('koa-router');

const router = new Router({
  prefix: '/api'
});

const phoneBook = require('./phonebook');
const group = require('./group');

router.use(phoneBook.routes());
router.use(group.routes());

// eslint-disable-next-line func-names
module.exports = function (app) {
  app.use(router.routes());
};
