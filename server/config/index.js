const envConfigs = require('dotenv');

envConfigs.config({ path: `${__dirname}/../.env` });

const dbConfig = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT,
  logging: Boolean(parseInt(process.env.DB_LOGGING, 10)) || false
};

const serverConfig = {
  host: process.env.HOST,
  port: process.env.PORT
};
module.exports = {
  serverConfig,
  dbConfig
};
