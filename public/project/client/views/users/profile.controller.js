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

            console.log("logged in user : " + loggedInUser);

            UserService.updateUser(
                loggedInUser._id,
                angular.copy(userToBeUpdated),
                function(response){
                    $rootScope.user=response.data;
                    console.log(response.data);
                });

            $location.path('/profile');
        }

    }
})();