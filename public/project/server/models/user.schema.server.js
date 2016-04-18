var mongoose = require("mongoose");

module.exports = function () {
    var ProjectUserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: String,
        following : [String],
        followers : [String],
        roles: [String]
    }, {collection: 'project.user'});
    return ProjectUserSchema;
};