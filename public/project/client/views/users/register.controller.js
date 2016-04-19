(function(){
    angular
        .module('StockPortfolioApp')
        .controller('RegisterController',RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        $scope.register=register;


        function register(user){

            console.log("hello from register controller");

            console.log("User : " + user);


            UserService.register(user)
                .then(function(response){
                    console.log("**************************************");
                    console.log(response.data);
                    $rootScope.user=response.data;
                    console.log($rootScope.user);
                    $location.path('/profile');
                });

            //$location.path('/profile');

        }
    };

})();