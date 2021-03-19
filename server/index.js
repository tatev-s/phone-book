const Koa = require('koa');
const { App, Database } = require('./modules/initializators');
const { dbConfig, serverConfig } = require('./config');
const middleWares = require('./middlewares/index');
// database instance
const database = new Database(dbConfig.logging);

// application instances
const app = new Koa();

const server = new App({
  database,
  app
});

/**
 * ############## MIDDLEWARES ##############
 */

app.use(require('@koa/cors')());

app.use(middleWares());

/**
 * ############## ROUTES ##############
 */
require('./api/routes')(app);

/**
 * ############## RUN SERVER ##############
 */
const { port } = serverConfig;

server.run(process.env.NODE_ENV === 'production' ? {} : { port }).catch((err) => {
  console.error(err);
});
