var mongoose = require("mongoose");
var q = require("q");

module.exports = function (db) {
    var ProjectUserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("ProjectUser", ProjectUserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        createUserForAdmin: createUserForAdmin,
        deleteUserById: deleteUserById,
        updateUserById: updateUserById,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        follow : follow,
        unfollow : unfollow,
        updateUserProfile : updateUserProfile
    };

    return api;


    function updateUserProfile(userId, user) {

        var deferred = q.defer();

        User
            .update (
                {_id: userId},
                {$set: user},
                function (err, stats) {
                    if (!err) {
                        console.log(stats);
                        //deferred.resolve(stats);

                        User.findOne (
                            {_id: userId},
                            function (err, users) {
                                if (!err) {
                                    deferred.resolve (users);
                                } else {
                                    deferred.reject (err);
                                }
                            }
                        );


                    } else {
                        deferred.reject(err);
                    }
                }
            );

        return deferred.promise;
    }


    function unfollow(userId, unfollowJson) {


        var whoWantsToUnFollow = unfollowJson.whoWantsToUnFollow;
        var whom = unfollowJson.whom;

        var u1_id = whoWantsToUnFollow._id;
        delete whoWantsToUnFollow['_id'];

        var u2_id = whom._id;
        delete whom['_id'];


        var deferred = q.defer();

        User.update(
            {_id: u1_id},
            {$set: whoWantsToUnFollow},
            function (err, stats) {
                User.update(
                    {_id: u2_id},
                    {$set: whom},
                    function (err, stats) {

                        User.find(
                            { $or : [ { _id : u1_id }, { _id : u2_id } ] },
                            function (err, users) {
                                if (!err) {
                                    deferred.resolve(users);
                                } else {
                                    deferred.reject(err);
                                }
                            });

                    });
            });

        return deferred.promise;

    }


    function follow(userId, followJson) {


        var whoWantsToFollow = followJson.whoWantsToFollow;
        var whom = followJson.whom;

        var u1_id = whoWantsToFollow._id;
        delete whoWantsToFollow['_id'];

        var u2_id = whom._id;
        delete whom['_id'];

        var deferred = q.defer();

        User.update(
            {_id: u1_id},
            {$set: whoWantsToFollow},
            function (err, stats) {
                User.update(
                    {_id: u2_id},
                    {$set: whom},
                    function (err, stats) {

                        User.find(
                            { $or : [ { _id : u1_id }, { _id : u2_id } ] },
                            function (err, users) {
                            if (!err) {
                                deferred.resolve(users);
                            } else {
                                deferred.reject(err);
                            }
                        });

                    });
            }

        );

        return deferred.promise;


    }



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


    function createUser(user) {

        //user.roles.push('admin');

        var deferred = q.defer();
        User.create(user, function (err, user) {
            if (err) {
                deferred.reject (err);
            } else {
                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
                console.log(user.username);
                //deferred.resolve(findUserByUsername(user.username));


                User
                    .findOne (
                        {username: user.username},
                        function (err, users) {
                            if (!err) {
                                console.log("--------------------------------------------------------------------------------------");
                                console.log(users);
                                deferred.resolve(users);
                            } else {
                                deferred.reject(err);
                            }
                        }
                    );


            }
        });
        return deferred.promise;




    }


    function createUserForAdmin(user) {

        //user.roles.push('admin');

        var deferred = q.defer();
        User.create(user, function (err, user) {
            if (err) {
                deferred.reject (err);
            } else {
                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
                console.log(user.username);
                //deferred.resolve(findUserByUsername(user.username));


                User
                    .find (
                        //{username: user.username},
                        function (err, users) {
                            if (!err) {
                                console.log("--------------------------------------------------------------------------------------");
                                //console.log(users);
                                deferred.resolve(users);
                            } else {
                                deferred.reject(err);
                            }
                        }
                    );


            }
        });
        return deferred.promise;


    }







    function deleteUserById(userId) {


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


    function findUserById(userId) {

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

    function findUserByUsername(userName) {

        console.log("inside find user by username");
        console.log(userName);


        var deferred = q.defer ();

        User
            .findOne (
                {username: userName},
                function (err, user) {
                    if (!err) {
                        console.log("--------------------------------------------------------------------------------------");
                        console.log(user);
                        deferred.resolve(user);
                    } else {
                        deferred.reject(err);
                    }
                }
            );

        return deferred.promise;
    }

    function updateUserById(userId, user) {

        var deferred = q.defer();

        User
            .update (
                {_id: userId},
                {$set: user},
                function (err, stats) {
                    if (!err) {
                        console.log(stats);
                        //deferred.resolve(stats);

                        User.find (
                            function (err, users) {
                                if (!err) {
                                    deferred.resolve (users);
                                } else {
                                    deferred.reject (err);
                                }
                            }
                        );


                    } else {
                        deferred.reject(err);
                    }
                }
            );

        return deferred.promise;
    }



};