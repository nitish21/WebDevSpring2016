(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,$rootScope , $location, UserService) {

        $scope.update = update;


        function update(userToBeUpdated) {

            console.log("hello from profile controller");

            var loggedInUser = $rootScope.user;

            console.log("logged in user : " + loggedInUser);

            UserService.updateUser(
                loggedInUser._id,
                userToBeUpdated,
                function(response){
                    $rootScope.user=response;
                    console.log(response);
                });

            $location.path('/profile');
        }

    }
})();