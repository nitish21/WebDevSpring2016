var mongoose = require("mongoose");

module.exports = function () {
    var CommentSchema = mongoose.Schema({
        Symbol: String,
        userId: String,
        username: String,
        Comment: String,
        createdDate: Date,
        abuseFlag: Boolean
    }, {collection: 'project.comment1'});
    return CommentSchema;
};