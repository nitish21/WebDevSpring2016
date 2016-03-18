(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope ,$location, UserService) {

        $scope.login = login;

        function login(credentials) {

            console.log("hello from login controller");

            console.log("credentials : " + credentials);

            UserService.findUserByCredentials(credentials.username, credentials.password)
                .then(function(response){


                    if(response.data){
                        console.log(response);
                        $rootScope.user = response.data;
                        $location.path('/profile');
                        console.log($rootScope.user);
                        console.log($rootScope.user.username);
                    }
                    else{
                        console.log("login failed..redirecting to /login");
                        $location.path('/login');

                    }
                });

        }

    }
})();