'use strict';
const MongoClient = require('mongodb').MongoClient;
const WeightsDAO = require('../dao/WeightsDAO').WeightsDAO;

const USER = 'oscardc';
const DATA = [ // [0] = month, [1] = day, [2] = weight
    [10, 20, 68.5],
    [10, 21, 68.2],
    [10, 22, 67.9],
    [10, 23, 68.8],
    [10, 24, 67.7],
    [10, 25, 68.3],
    [10, 26, 68.5],
    [10, 27, 67.8],
    [10, 28, 67.5],
    [10, 29, 67.2],
    [10, 30, 67],
    [11, 1, 67],
    [11, 2, 67.2],
    [11, 3, 67.5],
    [11, 4, 67.4]
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
        console.log(numInserts--);
        if(numInserts === 0){
            db.close();
        };
    };
});
