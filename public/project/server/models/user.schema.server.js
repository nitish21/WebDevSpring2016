var mongoose = require("mongoose");

module.exports = function () {
    var ProjectUserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        following : [String],
        followers : [String],
        roles: [String],
        type : String
    }, {collection: 'project.user'});
    return ProjectUserSchema;
};