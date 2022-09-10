const globals = require('../../common/globals');
const env = require('dotenv').config();
const express = require('express');
const router = express.Router();

// Global variables
const collectionName = globals.COLLECTION_NAME;

// Database reference for chosen database type
let db = require('../../databases/postgresql/db-postgresql');

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
    const result = await db(collectionName).select("*");
    if (result.length == 0) {
      // Print a message that no documents were found
      console.log("No documents found!");
    }
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
    const result = await db(collectionName).insert(newContact);
    if (result.rowCount === 1) {
      console.log(`A document was inserted with the _id: ${result[0]}`);
    }
    res.send({success: true});
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
  let id = parseInt(req.params.id);
  try {
    const result = await db(collectionName).where("_id", id).del();
    if (result === 1) {
      console.log("Successfully deleted one document.");
      res.send({success: true});
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
      res.send({success: false});
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
  let id = parseInt(req.params.id);
  let updatedContact = {"first_name": req.body.first_name, "last_name": req.body.last_name, "phone": req.body.phone};
  try {
    const result = await db(collectionName).where("_id", id).update(updatedContact);
    if (result === 1) {
      console.log("Successfully updated one document.");
      res.send({success: true});
    } else {
      console.log("No documents matched the query. Updated 0 documents.");
      res.send({success: false});
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
