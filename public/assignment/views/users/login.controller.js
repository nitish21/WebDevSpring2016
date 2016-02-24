(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope , UserService) {

        $scope.login = login;

        function login(credentials) {

            console.log("hello from login controller");

            console.log("credentials : " + credentials);

            UserService.findUserByCredentials(
                credentials.username,
                credentials.password,
                function(response){
                    console.log(response);
                    $rootScope.user=response;
                }
            );

            $location.path('/profile');

        }

    }
})();