// Importing modules
const globals = require('./common/globals');
const env = require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

// Global variables
const serverless = globals.SERVERLESS;
const host = globals.HOST;
const port = globals.PORT;
const databaseType = globals.DATABASE_TYPE;

function getRoute() {
  return new Promise((resolve, reject) => {
    // Prepare variable for route
    let route;
    // Route depending on database type
    if (databaseType == 0) {
      // MongoDb
      route = require('./routes/mongodb/route-mongodb');
    } else if (databaseType == 1) {
      // SQLite3
      route = require('./routes/sqlite/route-sqlite');
    } else if (databaseType == 2) {
      // MySQL
      route = require('./routes/mysql/route-mysql');
    }
    resolve(route);
  })
}

// Adding middleware - cors
app.use(cors());

// Adding body-parser
app.use(bodyparser.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Routes
getRoute().then((result) => {app.use('/api', result);});

// If not serverless, listen to defined host and port
if (serverless == false) {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Listening server ${host}:${port}`)
  });
}

// If you want to make you API serverless, you should first prepare the file structure
// according to the platform for deployment. For example, if you want to deploy and
// serve your data on the cloud as Firebase Cloud Functions, then you would first install
// firebase-admin and firebase-functions packages, put all files into the "functions" folders,
// connect the project to your Firebase account etc. Finally, you would set SERVERLESS = true
// in common/globals.js
// Besides Firebase there are some more platforms where you can deploy your API as serverless
// functions: Vercel, Netlify, Microsoft Azure... I suggest you to get information on how to
// properly prepare your code as serverless functions on those platforms.
