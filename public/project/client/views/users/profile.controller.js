(function () {
    angular
        .module("StockPortfolioApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,$rootScope , $location, UserService, PortfolioService,WatchListService) {

        $scope.update = update;
        $scope.stocks = [];
        $scope.watchListstocks = [];


        initialDisplayOfStocks();


        function initialDisplayOfStocks(){

            console.log("rootscope user is : " + $rootScope.user);

            if($rootScope.user) {
                PortfolioService.findAllStocksForUser($rootScope.user._id)
                    .then(function (response) {
                        //console.log(response.data);
                        angular.copy(response.data, $scope.stocks);
                        //console.log($scope.stocks);
                    });

            }

            if($rootScope.user) {
                WatchListService.findAllWatchlistStocksForUser($rootScope.user._id)
                    .then(function (response) {
                        //console.log(response.data);
                        angular.copy(response.data, $scope.watchListstocks);
                        //console.log($scope.watchListstocks);
                    });

            }


        }


        function update(userToBeUpdated) {

            console.log("hello from profile controller");

            var loggedInUser = $rootScope.user;

            var newUser = {};


            newUser.username = userToBeUpdated.username;
            newUser.firstName = userToBeUpdated.firstName;
            newUser.lastName = userToBeUpdated.lastName;
            newUser.emails = userToBeUpdated.emails;
            newUser.username = userToBeUpdated.username;
            newUser.following = userToBeUpdated.following;
            newUser.followers = userToBeUpdated.followers;
            newUser.roles = userToBeUpdated.roles;
            newUser.type = userToBeUpdated.type;


            console.log("logged in user : " + loggedInUser);

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