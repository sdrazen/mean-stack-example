const globals = require('../../common/globals');
const env = require('dotenv').config();
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Global variables
const collectionName = globals.COLLECTION_NAME;

// Database reference for chosen database type
let db = require('../../databases/mongodb/db-mongodb');

// API info
router.get('/info', (req, res, next) => {
  try {
    const result = {host: globals.HOST, port: globals.PORT, databasetype: globals.DATABASE_TYPE, databasetypename: globals.DATABASE_TYPE_NAME, databasename: globals.DATABASE_NAME, collectionname: globals.COLLECTION_NAME};
    res.send(result);
  }
  catch (err) {
      console.log("There was an error getting API info: " + err);
      res.send({error: err});
  } finally {
      // await client.close();
  }
});

// Retrieving contacts
router.get('/contacts', async (req, res, next) => {
  try {
    const cursor = db.collection(collectionName).find();
    // Print a message if no documents were found
    if ((await db.collection(collectionName).countDocuments() === 0)) {
        console.log("No documents found!");
    }
    // Print found documents
    const result = await cursor.toArray();
    res.send(result);
  }
  catch (err) {
      console.log("There was an error retrieving data: " + err);
      res.send({error: err});
  } 
  finally {
      // await client.close();
  }
});

// Add contact
router.post('/contact', async (req, res, next) => {
  let newContact = {"first_name": req.body.first_name, "last_name": req.body.last_name, "phone": req.body.phone};
  try {
    const result = await db.collection(collectionName).insertOne(newContact);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.send({_id: result.insertedId});
  }
  catch (err) {
      console.log("There was an error adding a document: " + err);
      res.send({error: err});
  } finally {
      // await client.close();
  }
});

// Delete contact
router.delete('/contact/:id', async (req, res, next) => {
  let id = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const result = await db.collection(collectionName).deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
      res.send({_id: id});
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
      res.send({_id: ""});
    }
  } catch (err) {
      console.log("There was an error deleting a document: " + err);
      res.send({error: err});
  } finally {
      // await client.close();
  }  
});

// Update contact
router.put('/contact/:id', async (req, res, next) => {
  let id = req.params.id;
  let updatedContact = {"first_name": req.body.first_name, "last_name": req.body.last_name, "phone": req.body.phone};
  try {
    const query = { _id: new ObjectId(id) };
    const result = await db.collection(collectionName).replaceOne(query, updatedContact);
    if (result.modifiedCount === 1) {
      console.log("Successfully updated one document.");
      res.send({_id: id});
    } else {
      console.log("No documents matched the query. Updated 0 documents.");
      res.send({_id: ""});
    }
  } 
  catch (err) {
      console.log("There was an error updating a document: " + err);
      res.send({error: err});
  } finally {
      // await client.close();
  }  
});

module.exports = router;
