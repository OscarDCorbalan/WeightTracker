/* The WeightsDAO must be constructed with a connected database object */
function WeightsDAO(db) {
    'use strict';

    /* If this constructor is called without the 'new' operator, 'this' points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof WeightsDAO)) {
        console.warn('Warning: WeightsDAO constructor called without "new" operator');
        return new WeightsDAO(db);
    }

    const clWeight = db.collection('weight');

    this.insertWeight = function (user, year, month, day, weight, callback) {
        console.log('inserting weight entry for', user, 'data:', year, month, day, weight);

        // fix up the permalink to not include whitespace

        // Build a new post
        var entry = {
            'user': user,
            'date': new Date(year, month, day),
            'weight': weight
        };

        // now insert the post
        clWeight.insert(entry, function (err, result) {
            if (err) return callback(err, null);
            callback(err, result);
        });
    };

    this.getPosts = function(num, callback) {
        posts.find().sort('date', -1).limit(num).toArray(function(err, items) {
            'use strict';

            if (err) return callback(err, null);

            console.log('Found ' + items.length + ' posts');

            callback(err, items);
        });
    }

    this.getPostsByTag = function(tag, num, callback) {
        posts.find({ tags : tag }).sort('date', -1).limit(num).toArray(function(err, items) {
            'use strict';

            if (err) return callback(err, null);

            console.log('Found ' + items.length + ' posts');

            callback(err, items);
        });
    }

    this.getPostByPermalink = function(permalink, callback) {
        posts.findOne({'permalink': permalink}, function(err, post) {
            'use strict';

            if (err) return callback(err, null);

            // XXX: Look here for final exam to see where we store 'num_likes'

            // fix up likes values. set to zero if data is not present
            if (typeof post.comments === 'undefined') {
                post.comments = [];
            }

            // Each comment document in a post should have a 'num_likes' entry, so we have to
            // iterate all the comments in the post to make sure that is the case
            for (var i = 0; i < post.comments.length; i++) {
                if (typeof post.comments[i].num_likes === 'undefined') {
                    post.comments[i].num_likes = 0;
                }
                post.comments[i].comment_ordinal = i;
            }
            callback(err, post);
        });
    }

    this.addComment = function(permalink, name, email, body, callback) {
        var comment = {'author': name, 'body': body}

        if (email != '') {
            comment['email'] = email
        }

        posts.update({'permalink': permalink}, {'$push': {'comments': comment}}, function(err, numModified) {
            'use strict';

            if (err) return callback(err, null);

            callback(err, numModified);
        });
    }

}

module.exports.WeightsDAO = WeightsDAO;
