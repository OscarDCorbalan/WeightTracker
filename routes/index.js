var ContentHandler = require('./content');
var ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app, db) {

    var content = new ContentHandler(db);

    // The main page of the blog
    // app.get('/', contentHandler.displayMainPage);

    app.get('/:user/weights/', content.displayUserData);

    // A single post, which can be commented on
    //app.post('/:user/weights/:year/:month/:day/:weight', content.insertWeight)

    // Error handling middleware
    app.use(ErrorHandler);
};
