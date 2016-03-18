(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {

            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserById: findUserById,

        };


        return api;


        function findUserByCredentials(username, password) {

            console.log(username);
            console.log(password);

            var url = "/api/assignment/user?username="+username+"&password="+password;

            return $http.get(url);


        }


        function findUserByUsername(username){

            console.log(username);

            var url = "/api/assignment/user?username="+username;

            return $http.get(url);

        }


        function findAllUsers(){

            console.log("inside find all users..");
            var url = "/api/assignment/user";

            return $http.get(url);

        }



        function findUserById(userId){

            return $http.get("/api/assignment/user/"+userId)
        }



        function createUser(user){

            return $http.post("/api/assignment/user",user);

        }


        function deleteUserById(userId){

            return $http.delete("/api/assignment/user/"+userId);

        }


        function updateUser(userId,newUser){

            return $http.put("/api/assignment/user/"+userId, newUser);

        }

    }
})();