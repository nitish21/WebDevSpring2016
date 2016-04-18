var users = require("./user.mock.json");

module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUserById: updateUserById,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        follow : follow,
        unfollow : unfollow
    };
    return api;


    function unfollow(userId, unfollowJson) {


        var whoWantsToUnFollow = unfollowJson.whoWantsToUnFollow;
        var whom = unfollowJson.whom;

        var respJson = {};

        for (var i = 0; i < users.length; i++) {

            var user = users[i];

            if(user.username == whoWantsToUnFollow){

                for(var j=0;j<user.following.length;j++){

                    var temp = user.following[j];

                    if(temp == whom){
                        user.following.splice(j,1);
                    }

                }

                respJson['whoUnFollowed'] = user;

            }

            if(user.username == whom){

                for(var j=0;j<user.followers.length;j++){

                    var temp = user.followers[j];

                    if(temp == whoWantsToUnFollow){
                        user.followers.splice(j,1);
                    }

                }

                respJson['whom'] = user;

            }

        }

        return respJson;


    }




    function follow(userId, followJson) {


        var whoWantsToFollow = followJson.whoWantsToFollow;
        var whom = followJson.whom;

        var respJson = {};

        for (var i = 0; i < users.length; i++) {

            var user = users[i];

            if(user.username == whoWantsToFollow){

                user.following.push(whom);

                respJson['whoFollowed'] = user;

            }

            if(user.username == whom){

                user.followers.push(whoWantsToFollow);

                respJson['whom'] = user;

            }

        }

        return respJson;


    }



    function findUserByCredentials(username, password) {

        console.log("in findUserByCredentials:");
        console.log("username is : " + username);
        console.log("password is : " + password);

        for (var i = 0; i < users.length; i++) {

            var user = users[i];

            if(user.username == username && user.password == password){

                return user;

            }
        }

        return null;


    }

    function findAllUsers() {

        return users;

    }

    function createUser(user) {

        var newUserRoles = [];

        if(user.roles) {
            for (var i = 0; i < user.roles.length; i++) {

                newUserRoles.push(user.roles[i]);

            }
        }

        var newUser = {
            "_id":(new Date).getTime(),
            "firstName":user.firstName,
            "lastName":user.lastName,
            "username":user.username,
            "password":user.password,
            "roles": newUserRoles
        }

        users.push(newUser);

        return newUser;


        //var newUser = {
        //    "_id": (new Date).getTime(),
        //    "username": user.username,
        //    "password": user.password,
        //    "email" : user.email
        //};
        //
        //users.push(newUser);
        //
        //return newUser;
    }


    function deleteUserById(userId) {


        for (var i = 0; i < users.length; i++) {

            var user = users[i];

            if(user._id == userId){

                users.splice(i, 1);

            }
        }

        return users;
    }


    function findUserById(userId) {

        userId = parseInt(userId);

        for(var i in users) {
            if(users[i]._id === userId) {
                return users[i];
            }
        }
        return null;
    }

    function findUserByUsername(userName) {

        for(var i in users) {
            if(users[i].username === userName) {
                return users[i];
            }
        }
        return null;
    }

    function updateUserById(userId, user) {
        //Accepts parameters user id, user object and callback function
        //Iterates over the array of current users looking for a user object whose user id is equal to parameter user id
        //If found, updates user with new user properties
        //Calls back with updated user

        for (var i = 0; i < users.length; i++) {

            var updatedUser = users[i];

            if (updatedUser._id == userId) {

                updatedUser = {
                    "_id": user._id,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "username": user.username,
                    "password": user.password
                }

                return updatedUser;

            }
        }

        return null;
    }


};