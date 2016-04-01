var mongoose = require("mongoose");
var q = require("q");

module.exports = function (db) {
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);

    var api = {

        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUserById: updateUserById,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById

    };
    return api;



    function findUserByCredentials (username,password) {

        var deferred = q.defer ();
        User
            .findOne (
                {username: username, password:password},
                function (err, user) {
                    if (!err) {
                        deferred.resolve(user);
                    } else {
                        deferred.reject(err);
                    }
                }
            );

        return deferred.promise;
    }

    function findAllUsers () {

        var deferred = q.defer ();

        User.find (
            function (err, users) {
                if (!err) {
                    deferred.resolve (users);
                } else {
                    deferred.reject (err);
                }
            }
        );

        return deferred.promise;
    }


    function createUser (user) {

        var deferred = q.defer();
        User.create(user, function (err, user) {
            if (err) {
                deferred.reject (err);
            } else {
                deferred.resolve (user);
            }
        });
        return deferred.promise;
    }


    function deleteUserById (userId) {


        var deferred = q.defer();

        User
            .remove (
                {_id: userId},
                function (err, stats) {
                    if (!err) {
                        //deferred.resolve(stats);

                        User.find(function (err, users) {
                            if (!err) {
                                //deferred.resolve(stats);
                                console.log("inside find() of deleteUserById");
                                console.log(users);
                                deferred.resolve (users);


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

    function updateUserById (userId, user) {

        var deferred = q.defer();

        User
            .update (
                {_id: userId},
                {$set: user},
                function (err, stats) {
                    if (!err) {
                        console.log(stats);
                        //deferred.resolve(stats);

                        User.findById(userId,
                            function (err, currentUser) {
                                if(err) {
                                    deferred.reject(err);
                                }
                                else {
                                    deferred.resolve(currentUser);
                                }
                            });


                    } else {
                        deferred.reject(err);
                    }
                }
            );

        return deferred.promise;

    }


    function findUserByUsername (username) {
        var deferred = q.defer ();

        User
            .findOne (
                {username: username},
                function (err, user) {
                    if (!err) {
                        deferred.resolve(user);
                    } else {
                        deferred.reject(err);
                    }
                }
            );

        return deferred.promise;
    }


    function findUserById (userId) {
        var deferred = q.defer ();

        User
            .findOne (
                {_id: userId},
                function (err, user) {
                    if (!err) {
                        deferred.resolve(user);
                    } else {
                        deferred.reject(err);
                    }
                }
            );

        return deferred.promise;
    }


};