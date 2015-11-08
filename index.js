'use strict';
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const WeightsDAO = require('./dao/WeightsDAO').WeightsDAO;  // DAO for weight data
const routes = require('./routes'); // Routes for the application

MongoClient.connect('mongodb://mdbuser123:mdbuser123@ds047504.mongolab.com:47504/tracker', function(err, db) {
    if(err) throw err;
    console.log('MongoDB connection OK');

    app.set('port', (process.env.PORT || 80));

    // Serve static content
    app.use(express.static(__dirname + '/public'));

    // Mount the web API
    routes(app, db);

    // Start the application
    app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
    });
});
