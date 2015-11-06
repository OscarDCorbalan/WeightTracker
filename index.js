'use strict';
const app = require('express')();
const MongoClient = require('mongodb').MongoClient;
const WeightsDAO = require('./dao/WeightsDAO').WeightsDAO;  // DAO for weight data
const routes = require('./routes'); // Routes for the application

MongoClient.connect('mongodb://mdbuser123:mdbuser123@ds047504.mongolab.com:47504/tracker', function(err, db) {
    if(err) throw err;
    console.log('MongoDB connection OK');

    /*var weights = new WeightsDAO(db);

    // TODO: delete these testing querys
    weights.insertWeight('oscardc', 2015, 11, 5, 68.5, function(err, op){
        if(err) throw err;
        console.log('TEST: insert OK - ', op);
    });
    weights.getWeightByDay('oscardc', 2015, 11, 6, function(err, doc){
        if(err) throw err;
        console.log('TEST: getWeightByDay OK', doc);
    });
    // TODO END */

    routes(app, db);
    app.listen(80);
    console.log('App listening on port 80');
});
