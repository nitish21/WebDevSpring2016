(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {

            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserById: findUserById,

            updateUserProfile: updateUserProfile,

            createUser: createUser,
            login : login,
            logout : logout,
            register: register

        };


        return api;


        function login(user) {
            console.log("inside dscdcdcdc");
            return $http.post("/api/assignment/login", user);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function register(user){

            //return $http.post("/api/assignment/user",user);
            return $http.post("/api/project/register",user);
        }

        function createUser(user){

            var response = $http.post("/api/assignment/user",user);
            console.log("//////////////");
            console.log(response);
            return response;

        }


        function findUserByCredentials(username, password) {

            console.log(username);
            console.log(password);

            var url = "/api/assignment/user?username="+username+"&password="+password;

            return $http.get(url);

        }

        function login(user){
            return $http.post("/api/assignment/login", user);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
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



        function register(user){

            //return $http.post("/api/assignment/user",user);
            return $http.post("/api/assignment/register",user);
        }


        function deleteUserById(userId){

            return $http.delete("/api/assignment/user/"+userId);

        }


        function updateUser(userId,newUser){

            console.log("user Id is : ");
            console.log("new state of user should be : ");

            console.log(newUser);

            console.log("sending request to server ......");

            return $http.put("/api/assignment/user/"+userId, newUser);

        }


        function updateUserProfile(userId,newUser){

            console.log("user Id is : ");
            console.log("new state of user should be : ");

            console.log(newUser);

            console.log("sending request to server ......");

            return $http.put("/api/assignment/userProfile/"+userId, newUser);

        }


    }
})();