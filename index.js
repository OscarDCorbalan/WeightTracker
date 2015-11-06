'use strict';
const app = require('express')();
const MongoClient = require('mongodb').MongoClient;
const WeightsDAO = require('./dao/WeightsDAO').WeightsDAO;  // DAO for weight data
//const routes = require('./routes'); // Routes for the application

MongoClient.connect('mongodb://mdbuser123:mdbuser123@ds047504.mongolab.com:47504/tracker', function(err, db) {
    if(err) throw err;
    function simpleHandler(err, doc){

    };
    /* TODO: delete these testing querys */
    var query = { 'user' : 'oscardc' };
    var projection = {
        '_id': 0,
        'date': 1,
        'weight': 1
    };
    db.collection('weight').find(query, projection).toArray(function(err, docs){
        if(err) throw err;
        console.log('find query OK', docs);
    });
    var weights = new WeightsDAO(db);
    weights.insertWeight('oscardc', 2015, 11, 6, 68, function(err, doc){
        if(err) throw err;
        console.log('TEST: insert OK - ', doc);
    });
    weights.getWeightByDay('oscardc', 2015, 11, 6, function(err, doc){
        if(err) throw err;
        console.log('TEST: getWeightByDay OK', doc);
    });
    /* TODO END */

    //routes(app, db);
});
