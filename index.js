'use strict';
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var WeightsDAO = require('./dao/WeightsDAO').WeightsDAO;

MongoClient.connect('mongodb://mdbuser123:mdbuser123@ds047504.mongolab.com:47504/tracker', function(err, db) {
    if(err) throw err;


    var query = { 'user' : 'oscardc' };
    var projection = {
        '_id': 0,
        'date': 1,
        'weight': 1
    };
    db.collection('weight').find(query, projection).toArray(function(err, docs){
        if(err) throw err;
        console.dir('find query OK', docs);
    });

    var weights = new WeightsDAO(db);
    weights.insertWeight('oscardc', 2015, 11, 6, 68, function(err, doc){
        if(err) throw err;
        console.log('insert query OK', doc);
    });
});
