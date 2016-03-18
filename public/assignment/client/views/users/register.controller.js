(function(){
    angular
        .module('FormBuilderApp')
        .controller('RegisterController',RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        $scope.register=register;


        function register(user){

            console.log("hello from register controller");

            console.log("User : " + user);


            UserService.createUser(user)
                .then(function(response){
                    console.log(response.data);
                    $rootScope.user=response.data;
                    console.log($rootScope.user);
                });

            $location.path('/profile');

        }
    };

})();