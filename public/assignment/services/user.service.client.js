(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById: deleteUserById

        };

        var usersArray = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];



        return api;

        function findUserByCredentials(username, password, callback) {
            //Accepts parameters username, password, and callback function
            //Iterates over the array of current users looking for user object whose username and password match the parameters
            //Calls back with user found or null otherwise

            for (var i = 0; i < usersArray.length; i++) {
                var user = usersArray[i];

                if(user.username == username && user.password == password){

                    callback(user);

                }
            }

            callback(null);

        }


        function findAllUsers(callback) {
            //Accepts parameter callback function
            //Calls back with array of all users

            callback(usersArray);

        }


        function createUser(user, callback) {
            //Accepts parameters user object and callback function
            //Adds property called _id with unique value to the user object parameter. You can use (new Date).getTime() to get a unique time stamp
            //Adds the new user to local array of users
            //Calls back with new user

            var newUserRoles = [];

            if(!user.roles) {
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

            usersArray.push(newUser);

        }

        function deleteUserById(userId, callback) {


            for (var i = 0; i < usersArray.length; i++) {

                var user = usersArray[i];

                if(user._id == userId){

                    usersArray.splice(i, 1);

                }
            }

            callback(usersArray);
        }

        function updateUser(userId, user, callback) {
            //Accepts parameters user id, user object and callback function
            //Iterates over the array of current users looking for a user object whose user id is equal to parameter user id
            //If found, updates user with new user properties
            //Calls back with updated user

            for (var i = 0; i < usersArray.length; i++) {

                var updatedUser = usersArray[i];

                if(updatedUser._id == userId){

                    updatedUser = {
                        "_id":user._id,
                        "firstName":user.firstName,
                        "lastName":user.lastName,
                        "username":user.username,
                        "password":user.password,
                        "roles": user.roles
                    }

                    callback(updatedUser);

                }


            }

            callback(null);
        }

    }
})();