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

        var deferred = q.defer();

        Form
            .remove (
                {_id: formId},
                function (err, stats) {
                    if (!err) {
                        //deferred.resolve(stats);

                        Form.find(function (err, forms) {
                            if (!err) {
                                //deferred.resolve(stats);
                                console.log("inside find() of deleteFormById");
                                console.log(forms);
                                deferred.resolve (forms);


                            } else {
                                deferred.reject(err);
                            }
                        })


                    } else {
                        deferred.reject(err);
                    }
                }
            );

        return deferred.promise;


    }


    function updateFormById(formId,form) {

        var deferred = q.defer();

        Form
            .update (
                {_id: formId},
                {$set: form},
                function (err, stats) {
                    if (!err) {
                        console.log(stats);
                        //deferred.resolve(stats);

                        deferred.resolve(findFormById(formId));


                    } else {
                        deferred.reject(err);
                    }
                }
            );

        return deferred.promise;
    }


};