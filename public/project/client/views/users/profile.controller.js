(function () {
    angular
        .module("StockPortfolioApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,$rootScope , $location, UserService, APIStockService) {

        $scope.update = update;
        $scope.stocks=[];



        initialDisplayOfStocks();


        function initialDisplayOfStocks(){

            console.log("rootscope user is : " + $rootScope.user);

            APIStockService.findAllStocksForUser(
                $rootScope.user._id,
                function (response) {
                    angular.copy(response, $scope.stocks);
                });



        }


        function update(userToBeUpdated) {

            console.log("hello from profile controller");

            var loggedInUser = $rootScope.user;

            var newUser = {};
            newUser.username = userToBeUpdated.username;
            newUser.password = userToBeUpdated.password;
            newUser.firstName = userToBeUpdated.firstName;
            newUser.lastName = userToBeUpdated.lastName;
            newUser.emails = userToBeUpdated.emails;
            newUser.phones = userToBeUpdated.phones;

            console.log("logged in user : " + loggedInUser);

            //console.log(userToBeUpdated);

            UserService.updateUser(
                loggedInUser._id,
                newUser,
                function(response){
                    $rootScope.user=response.data;
                    console.log(response.data);
                });

            $location.path('/profile');
        }

    }
})();