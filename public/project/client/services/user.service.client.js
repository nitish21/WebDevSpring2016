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
            follow : follow,
            unfollow : unfollow,

            updateUserProfile: updateUserProfile,

            login : login,
            logout : logout,
            register: register


        };


        return api;


        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function register(user){

            //return $http.post("/api/assignment/user",user);
            return $http.post("/api/project/register",user);
        }


        function unfollow(userId,unfollowJson){

            var url = "/api/project/userUnfollow/"+userId;

            return $http.put(url, unfollowJson);

        }


        function follow(userId,followJson){

            var url = "/api/project/userfollow/"+userId;

            return $http.put(url, followJson);

        }

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

            var response = $http.post("/api/project/user",user);
            console.log("//////////////");
            console.log(response);
            return response;

        }


        function deleteUserById(userId){

            return $http.delete("/api/project/user/"+userId);

        }


        function updateUser(userId,newUser){

            return $http.put("/api/project/user/"+userId, newUser);

        }

        function updateUserProfile(userId,newUser){

            console.log("user Id is : ");
            console.log("new state of user should be : ");

            console.log(newUser);

            console.log("sending request to server ......");

            return $http.put("/api/project/userProfile/"+userId, newUser);

        }

    }
})();