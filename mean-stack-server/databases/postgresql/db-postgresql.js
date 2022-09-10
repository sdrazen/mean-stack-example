const globals = require('../../common/globals');
const knex = require('knex');
const env = require('dotenv').config();

// Global variables
const databaseName = globals.DATABASE_NAME;
const databaseTypeName = globals.DATABASE_TYPE_NAME;
const postgresqlHost = globals.POSTGRESQL_HOST;
const postgresqlPort = globals.POSTGRESQL_PORT;
const postgresqlUser = globals.POSTGRESQL_USER;
const postgresqlPassword = globals.POSTGRESQL_PASSWORD;

const database = knex({
  client: 'pg',
  connection: {
    host : postgresqlHost,
    port : postgresqlPort,
    user : postgresqlUser,
    password : postgresqlPassword,
    database : databaseName
  }
});

// Message to the user about the connection
console.log(`Connection to database ${databaseName} (${databaseTypeName}) is ready...`);

module.exports = database;
