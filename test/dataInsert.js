'use strict';
const MongoClient = require('mongodb').MongoClient;
const WeightsDAO = require('../dao/WeightsDAO').WeightsDAO;

const USER = 'oscardc';
const DATA = [ // [0] = month, [1] = day, [2] = weight
    [9, 20, 68.5],
    [9, 21, 68.2],
    [9, 22, 67.9],
    [9, 23, 68.8],
    [9, 24, 67.7],
    [9, 25, 68.3],
    [9, 26, 68.5],
    [9, 27, 67.8],
    [9, 28, 67.5],
    [9, 29, 67.2],
    [9, 30, 67],
    [10, 1, 67],
    [10, 2, 67.2],
    [10, 3, 67.5],
    [10, 5, 67.4],
    [10, 6, 66.6],
    [10, 7, 67.3],
    [10, 8, 66.5],
    [10, 9, 66.8],
    [10, 10, 68.7],
    [10, 12, 66.8],
    [10, 13, 66.7],
    [10, 15, 67],
    [10, 18, 68.5],
    [10, 19, 67.4],
    [10, 20, 67.2],
    [10, 21, 67.2],
    [10, 22, 67.7],
    [10, 23, 67.4],
    [10, 25, 67.2],
    [10, 26, 67.1],
    [10, 27, 67.2],
    [10, 28, 67.1],
    [10, 29, 66.8],
    [10, 29, 66.8],
    [10, 29, 66.8],
    [10, 29, 66.8],
    [10, 29, 66.8],
    [10, 29, 66.8],
    [10, 29, 66.8],
    [11, 3, 67.2],
    [11, 8, 66.8]
];


MongoClient.connect('mongodb://mdbuser123:mdbuser123@ds047504.mongolab.com:47504/tracker', function(err, db) {
    if(err) throw err;
    console.log('MongoDB connection OK');
    var numInserts = DATA.length;
    var weights = new WeightsDAO(db);

    DATA.forEach(function(elem){
        weights.insertWeight(USER, 2015, elem[0], elem[1], elem[2], insertHandler);
    });

    function insertHandler(err, doc){
        if(err) throw err;
        numInserts--;
        if(numInserts === 0){
            db.close();
        };
    };
});
