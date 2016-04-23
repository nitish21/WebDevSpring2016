(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,$rootScope , $location, UserService) {

        //$scope.update = update;
        var vm = this;
        vm.update = update;
        vm.user=$rootScope.user;


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

            UserService.updateUserProfile(loggedInUser._id, newUser)
                .then(function(response){
                    console.log("inside update user profile response :::::::::");
                    $rootScope.user=response.data;
                    console.log(response.data);
                });


            $location.path('/profile');
        }

    }
})();