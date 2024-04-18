const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const fs = require('fs');
const cors = require('cors');
app.use(cors());
const rxjs = require('rxjs');

PORT = 9909;

const pw = "dashboardCredentialsTopSecretPass";
const userlogin = "dashboardUser";
const uri = "mongodb+srv://"+userlogin+":"+pw+"@testmongo.94agqyf.mongodb.net/?retryWrites=true&w=majority&appName=testMongo";

async function pregen(pregen) {
    const client = new MongoClient(uri);
    await client.connect();

    const dbName = "userlogs";
    const collectionName = "userlogs";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    try {
    const insertManyResult = await collection.insertMany(pregen);
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
    } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    }

    // const findQuery = {  };
    // try {
    // const cursor = await collection.find(findQuery).sort({ name: 1 });
    // await cursor.forEach(result => {
    //     console.log(`user ${result.name} at time ${result.time}`);
    // });
    // console.log();// add a linebreak
    // } catch (err) {
    // console.error(`Something went wrong trying to find the documents: ${err}\n`);
    // }

    // Make sure to call close() on your client to perform cleanup operations
    await client.close();
}

async function getRecords() {
    const client = new MongoClient(uri);
    await client.connect();

    const dbName = "userlogs";
    const collectionName = "userlogs";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    let resultData = [];
    const findQuery = {  };
    try {
        const cursor = await collection.find(findQuery);
        await cursor.forEach(result => {
            // console.log(`user ${result.name} at time ${result.time}`);
            resultData.push(result);
        });
        // console.log();// add a linebreak
    } catch (err) {
        console.error(`Something went wrong trying to find the documents: ${err}\n`);
    }

    // Make sure to call close() on your client to perform cleanup operations
    await client.close();

    // console.log(resultData.length);
    return resultData;
}



function getDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
}


// GET endpoint
app.get('/', (req, res) => {
    getRecords().then((result) => {
        res.status(200);
        res.json(result);
        return res;
    });
});

// POST endpoint
app.post('/new/', jsonParser, (req, res) => {
    console.log("req.body: ");
    console.log(req.body);
    const newData = {name: req.body.name, time:getDate()};

    pregen([newData]).then((result) => {
        res.status(200);
        res.json(result);
        return res;
    });
});

app.listen(PORT, () => {
    console.log(`MongoDB API hosted on port ${PORT}`)
});