const globals = require('../../common/globals');
const knex = require('knex');
const env = require('dotenv').config();

// Global variables
const databaseName = globals.DATABASE_NAME;
const databaseTypeName = globals.DATABASE_TYPE_NAME;
const sqliteDbLocation = globals.SQLITE_DB_LOCATION

const database = knex({
  client: "sqlite3",
  connection: {
    filename: sqliteDbLocation + "/" + databaseName + ".db"
  },
  useNullAsDefault: true
});

// Message to the user about the connection
console.log(`Connection to database ${databaseName} (${databaseTypeName}) is ready...`);

module.exports = database;
