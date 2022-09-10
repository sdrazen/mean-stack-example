const globals = require('../../common/globals');
const knex = require('knex');
const env = require('dotenv').config();

// Global variables
const databaseName = globals.DATABASE_NAME;
const databaseTypeName = globals.DATABASE_TYPE_NAME;
const mysqlHost = globals.MYSQL_HOST;
const mysqlPort = globals.MYSQL_PORT;
const mysqlUser = globals.MYSQL_USER;
const mysqlPassword = globals.MYSQL_PASSWORD;

const database = knex({
  client: 'mysql2',
  connection: {
    host : mysqlHost,
    port : mysqlPort,
    user : mysqlUser,
    password : mysqlPassword,
    database : databaseName
  }
});

// Message to the user about the connection
console.log(`Connection to database ${databaseName} (${databaseTypeName}) is ready...`);

module.exports = database;
