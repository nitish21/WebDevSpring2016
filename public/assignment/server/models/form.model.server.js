var mongoose = require("mongoose");
var q = require("q");

module.exports = function () {
    var FormSchema = require("./form.schema.server")();
    var Form = mongoose.model("Form", FormSchema);

    var api = {

        getMongooseModel: getMongooseModel,
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        findFormById : findFormById,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById

    };
    return api;

    function getMongooseModel() {
        return Form;
    }


    function createFormForUser (userId, form) {

        var deferred = q.defer();

        form["userId"] = userId;

        Form.create (form,
            function (err, form) {
                if (!err) {
                    console.log(form);
                    deferred.resolve(form);
                } else {
                    deferred.reject(err);
                }
            });

        return deferred.promise;
    }


    function findAllFormsForUser (userId) {
        var deferred = q.defer();

        Form
            .find(
                {userId: userId},
                function (err, forms) {
                    if (!err) {
                        console.log(forms);
                        deferred.resolve (forms);
                    } else {
                        deferred.reject (err);
                    }
                }
            );
        return deferred.promise;
    }


    function findFormById (formId) {
        return Form.findById (formId);
    }


    function deleteFormById(formId) {
        return Form.remove().where("_id").equals(formId);
    }


    function updateFormById(formId,form) {

        var deferred = q.defer();

        User
            .update (
                {_id: formId},
                {$set: form},
                function (err, stats) {
                    if (!err) {
                        console.log(stats);
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );

        return deferred.promise;
    }


};