(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope ,$location, UserService) {

        $scope.login = login;

        var vm = this;
        vm.login = login;

        function login(user) {

            console.log("hello from login controller");

            console.log("credentials : " + user);

            UserService
                //.findUserByCredentials(credentials.username, credentials.password)
                .login(user)
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
        },function (err) {
            if(err.data == "Unauthorized") {
                vm.error = "username/password does not exist";
            }
        });

        }

    }
})();