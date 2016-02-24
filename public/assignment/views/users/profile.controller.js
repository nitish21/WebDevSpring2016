(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,$rootScope , UserService) {

        $scope.update = update;


        //if($scope.newUser) {
        //    search($scope.newUser);
        //}

        function update(userToBeUpdated) {

            console.log("hello from profile controller");

            var loggedInUser = $rootScope.user;

            UserService.updateUser(
                loggedInUser._id,
                userToBeUpdated,
                function(response){
                    console.log(response);
                    //$scope.data = response;
                });
        }

    }
})();