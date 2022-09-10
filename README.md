# MEAN stack example

A simple MEAN stack client/server example web application which can be used for experimenting purposes or even as kind of boilerplate code for real full stack applications. As this project's name suggests, for client-side Angular is used, server-side code is written in Node using Express as middleware. Client can connect to and present data provided by four database types: **MongoDb**, **SQLite3**, **MySQL** and **PostgreSQL**.

Feel free to use or modify this code in any way you like, add your own database types, modify API endpoints etc.

## Installing

```bash
cd mean-stack-client
npm install

cd mean-stack-server
npm install
```

## Getting started

Althought you can start your server side code without _`nodemon`_ (by simply using _`node app.js`_), it's advisable to install _`nodemon`_ globally (_`npm install -g nodemon`_) and use it because of the convenience as you don't have to restart your server with each little modification in code while experimenting.
The default database to read data from is **SQLite3** as this data already exists as part of this project. Using other database types (**MongoDb, MySQL** or **PostgreSQL**) requires to have that simple database called _`contact-list-database`_ and a table called _`contacts`_ which has four fields:

- `_id:`: \<autonumber of any kind>
- `first_name`: string
- `last_name`: string
- `phone`: string

If you don't want to create any new databases right now, you can start leaving the default setting which will use the existing **SQLite3** database. Just start your server side as well as you client side code which will consume you server's data. Client side anyway doesn't care where data comes from, it will present data that backend gives to it regardless of the current data source.

```bash
cd mean-stack-server
nodemon

cd mean-stack-client
ng serve
```

## Usage

If you want to expreriment a little bit but not too much, there are only two places where you should be focused on: Configuration parameters on the server side and on the client side. As previously mentioned, client side does not really care about the data source and how backend code will deliver expected data. That's the way it should be at that, we can call it _presentation layer_. So the only parameter client side cares about is the URL where it can get its data to present to the front-end. That parameter can be found in the file _common/globals.ts_ (client side folder) and looks like this:

```javascript
public static api_url: string = "http://localhost:8080/api";
```

So, if you deploy your API to some cloud service, use different port or change the url in any other way - this is the place on the client side which has to know about it.

Server side, on the other hand, has more potential configuration options to play with. You can change the database from which data comes, port, database name, table name, API endpoint etc. Those parameters can be found in the file _common/globals.js_ (server side folder):

```javascript
// Server (unless serverless)
const SERVERLESS = false;
const HOST = "localhost";
const PORT = 8080;

// Database
const DATABASE_TYPE = 1; // 0 = MongoDb, 1 = SQLite3, 2 = MySQL, 3 = PostgreSQL
const DATABASE_TYPE_NAME = getDatabaseTypeName(DATABASE_TYPE);
const DATABASE_NAME = "contact-list-database";
const COLLECTION_NAME = "contacts";

// MongoDb specific
const MONGODB_URI = "<YOUR-MONGODB-URI-HERE>"; // <YOUR-MONGODB-URI-HERE>

// SQLite3 specific
const SQLITE_DB_LOCATION = "./databases/sqlite";

// MySQL specific
const MYSQL_HOST = "127.0.0.1";
const MYSQL_PORT = 3306;
const MYSQL_USER = "root";
const MYSQL_PASSWORD = "";

// PostgreSQL specific
const POSTGRESQLL_HOST = "127.0.0.1";
const POSTGRESQL_PORT = 5432;
const POSTGRESQL_USER = "postgres";
const POSTGRESQL_PASSWORD = "";
```

## API endpoints

- `api/info (GET)` - returns basic info on current data source
- `api/contacts (GET)` - returns all contact from the current data source
- `api/contact (POST)` - saves new record to the current database
- `api/contact/:id (PUT)` - updates one record with new data in the current database
- `api/contact/:id (DELETE)` - deletes one record from the current database

## Next steps

Let's say you want to add a new database type to the backend and thus expand on its possibilities. It's really simple:

- in the _`databases`_ folder add new subfolder where you will put a new `*.js` file specific to that database type
- in the _`routes`_ folder add new subfolder where you will put a new `*.js` file specific to that database type
- let _`app.js`_ know about your new database type in the _`getRoute()`_ function
- add some configuration possibilities in the file _`common/globals.js`_

Finally, if you would like to make you API serverless, you should first prepare the file structure
according to the platform for deployment. For example, if you want to deploy and
serve your data on the cloud as **Firebase Cloud Functions**, then you would first install
_`firebase-admin`_ and _`firebase-functions`_ packages, put all files into the _functions_ folder,
connect the project to your Firebase account etc. Finally, you would set `SERVERLESS = true`
in the server's file _`common/globals.js`_.
Besides **Firebase** there are some more platforms where you can deploy your API as serverless
functions: **Vercel**, **Netlify**, **Microsoft Azure**... I suggest you to get information on how to
properly prepare your code as serverless functions on those platforms.

Happy coding!
