'use strict';
const WeightsDAO = require('../dao/WeightsDAO').WeightsDAO;
//  sanitize = require('validator').sanitize;

/* The ContentHandler must be constructed with a connected db */
function ContentHandler (db) {
    const weights = new WeightsDAO(db);

    this.displayUserData = function(req, res, next) {
        weights.getUserWeights(req.params.user, function(err, results) {
            if (err) return next(err);
            return res.json(results);
        });
    };
};

module.exports = ContentHandler;
