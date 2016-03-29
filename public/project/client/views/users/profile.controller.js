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