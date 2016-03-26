(function(){
    angular
        .module("StockPortfolioApp")
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

            var url = "/api/project/user?username="+username+"&password="+password;

            return $http.get(url);


        }


        function findUserByUsername(username){

            console.log(username);

            var url = "/api/project/user?username="+username;

            return $http.get(url);

        }


        function findAllUsers(){

            console.log("inside find all users..");
            var url = "/api/project/user";

            return $http.get(url);

        }



        function findUserById(userId){

            return $http.get("/api/project/user/"+userId)
        }



        function createUser(user){

            return $http.post("/api/project/user",user);

        }


        function deleteUserById(userId){

            return $http.delete("/api/project/user/"+userId);

        }


        function updateUser(userId,newUser){

            return $http.put("/api/project/user/"+userId, newUser);

        }

    }
})();