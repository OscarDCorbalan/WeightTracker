var ContentHandler = require('./content');
var ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app, db) {

    var content = new ContentHandler(db);

    // Get all the user weights
    app.get('/:user/weights/', content.displayUserData);

    // Insert a new weight
    app.put('/:user/weights/:year/:month/:day/:weight', content.insertWeight)

    // Delete a weight
    app.delete('/:user/weights/:year/:month/:day', content.deleteWeight)

    // Error handling middleware
    app.use(ErrorHandler);
};
