(function () {
    angular
        .module("StockPortfolioApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope ,$location, UserService) {

        $scope.login = login;

        function login(user) {

            console.log("hello from login controller");

            console.log("credentials : " + user);

            UserService
                //.findUserByCredentials(user.username, user.password)
                .login(user)
                .then(function(response){

                    console.log("inside then() of login");

                    if(response.data){
                        console.log(response);
                        $rootScope.user = response.data;
                        console.log($rootScope.user);
                        console.log($rootScope.user.username);
                        //user = {};
                        $location.path('/profile');
                    }
                    else{
                        console.log("login failed..redirecting to /login");
                        $location.path('/login');

                    }
                },function (err) {
                    if(err.data == "Unauthorized") {
                        $scope.error = "username/password does not exist";
                    }
                });



        }

    }
})();