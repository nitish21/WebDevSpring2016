var mongoose = require("mongoose");

module.exports = function () {
    var WatchlistSchema = mongoose.Schema({
        Symbol: String,
        Name: String,
        userId: String,
        username : String
    }, {collection: 'project.watchlist'});
    return WatchlistSchema;
};