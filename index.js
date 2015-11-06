'use strict';
const app = require('express')();
const MongoClient = require('mongodb').MongoClient;
const WeightsDAO = require('./dao/WeightsDAO').WeightsDAO;  // DAO for weight data
const routes = require('./routes'); // Routes for the application

MongoClient.connect('mongodb://mdbuser123:mdbuser123@ds047504.mongolab.com:47504/tracker', function(err, db) {
    if(err) throw err;
    console.log('MongoDB connection OK');

    routes(app, db);
    app.listen(80);
    console.log('App listening on port 80');
});
