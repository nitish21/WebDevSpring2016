(function(){
    angular
        .module('FormBuilderApp')
        .controller('RegisterController',RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        $scope.register=register;


        function register(user){

            console.log("hello from register controller");

            console.log("User : " + user);


            UserService.createUser(user,
                function(response){
                    console.log(response);
                    $rootScope.user=response;
                    console.log($rootScope.user);
                }
            )
            $location.path('/profile');

        }
    };

})();