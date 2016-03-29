var mongoose = require("mongoose");

module.exports = function () {

    var FieldSchema = require("./field.schema.server")();

    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        created: Date,
        updated: Date,
        fields: [FieldSchema]
    }, {collection: "form"});

    return FormSchema;
};