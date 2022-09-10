const globals = require('../../common/globals');
const env = require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// Global variables
const databaseName = globals.DATABASE_NAME;
const uri = process.env.MONGODB_URI;
const databaseTypeName = globals.DATABASE_TYPE_NAME;

// Mongodb client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Connect to client
client.connect(err => {
  if (err) {
    console.log(`Connection to ${databaseTypeName} failed... ` + err);
    client.close();
  }
});

// On connection
client.on("connectionReady", () => {
  console.log(`Connection to database ${databaseName} (${databaseTypeName}) is ready...`);
});

// Database
const database = client.db(databaseName);

module.exports = database;
