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

            var newUser = {};
            newUser.username = userToBeUpdated.username;
            newUser.password = userToBeUpdated.password;
            newUser.firstName = userToBeUpdated.firstName;
            newUser.lastName = userToBeUpdated.lastName;
            newUser.emails = userToBeUpdated.emails;
            newUser.phones = userToBeUpdated.phones;

            UserService.updateUser(loggedInUser._id, newUser)
                .then(function(response){
                    $rootScope.user=response.data;
                    console.log(response.data);
                });


            $location.path('/profile');
        }

    }
})();