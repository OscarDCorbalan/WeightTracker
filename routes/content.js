'use strict';
const WeightsDAO = require('../dao/WeightsDAO').WeightsDAO;
//  sanitize = require('validator').sanitize;

/* The ContentHandler must be constructed with a connected db */
function ContentHandler (db) {
    const weights = new WeightsDAO(db);

    this.displayUserData = function(req, res, next) {
        weights.getUserWeights(req.params.user, this.send);
    };

    this.insertWeight = function(req, res, next){
        const prm = req.params;
        weights.insertWeight(prm.user, prm.year, prm.month, prm.day, prm.weight, function(err, object){
            if(err) return next(err);
            return res.json(object);
        });
    };

    this.send = function(err, object){
        if(err) return next(err);
        return res.json(object);
    };
};

module.exports = ContentHandler;
