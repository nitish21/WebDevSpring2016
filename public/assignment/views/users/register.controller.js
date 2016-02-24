(function(){
    angular
        .module('FormBuilderApp')
        .controller('RegisterController',RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        $scope.register=function(user){

            UserService.createUser(user,
                function(response){
                    $rootScope.user=response;
                    console.log($rootScope.user);
                }
            )
            $location.path('/profile');

        }
    };

})();