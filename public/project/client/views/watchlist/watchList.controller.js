(function () {
    angular
        .module("StockPortfolioApp")
        .controller("WatchlistController", WatchlistController);

    function WatchlistController($scope, $rootScope, $location, WatchListService, APIStockService) {

        $scope.addStock = addStock;
        //$scope.updateStock = updateStock;
        $scope.deleteStock = deleteStock;
        $scope.selectStock = selectStock;
        $scope.stocks=[];


        initialDisplayOfStocks();


        function initialDisplayOfStocks(){

            var currentUserStocks = [];

            console.log("inside initialDisplayOfStocks in watchlist controller...");

            WatchListService.findAllWatchlistStocksForUser($rootScope.user._id)
                .then(function (response) {

                    console.log(response.data);

                    angular.copy(response.data, currentUserStocks);


                    if(response.data.length > 0) {
                        refreshPortfolioTable(currentUserStocks, true);
                    }
                });


        }



        function refreshPortfolioTable(currentUserStocks,flag){

            //if(currentUserStocks.length > 0) {

                APIStockService.findLivePricesOfStocks(currentUserStocks,
                    function (response) {
                        //console.log(response.query.results.quote);

                        if (response.query.results.quote.length != undefined) {

                            console.log("(((((((((((((((((((((((((((((((((((");

                            for (var i = 0; i < response.query.results.quote.length; i++) {
                                currentUserStocks[i]['livePrice'] = (response.query.results.quote[i].LastTradePriceOnly);
                                currentUserStocks[i]['change'] = response.query.results.quote[i].Change;
                                //currentUserStocks[i]['percentChange'] = response.query.results.quote[i].percentChange;

                            }
                        }
                        else {

                            console.log("(((((((((((going corrrect(((((((((((((");

                            currentUserStocks[0]['livePrice'] = (response.query.results.quote.LastTradePriceOnly);
                            currentUserStocks[0]['change'] = response.query.results.quote.Change;
                            //currentUserStocks[0]['percentChange'] = response.query.results.quote.percentChange;

                        }

                        if (flag == true) {
                            angular.copy(currentUserStocks, $scope.stocks);
                        }
                    });

            //}

        }



        function addStock(newStock){

            console.log("hello from create stock iin portfolio controller");

            var loggedInUser = $rootScope.user;

            console.log("logged in user : " + loggedInUser);

            newStock["username"] = loggedInUser.username;

            WatchListService.createWatchlistStockForUser(loggedInUser._id, newStock)
                .then(function(response){
                    console.log(response.data);
                    $scope.stocks.push(response.data);

                    $scope.stock = {};
                    $scope.selectedIndex = null;

                });


        }

        function deleteStock(index){

            console.log("hello from delete stock in portfolio controller");

            var stockToBeDeleted = $scope.stocks[index];

            var loggedInUser = $rootScope.user;

            console.log("logged in user : " + loggedInUser);

            WatchListService.deleteWatchlistStockById(stockToBeDeleted._id)
                .then(function(responseAllStocks){
                    //$scope.stocks = response;

                    console.log(responseAllStocks.data);

                    var stocksOfUser = [];

                    getStocksForUser(responseAllStocks.data, loggedInUser._id, stocksOfUser);

                    console.log(stocksOfUser);

                    if(stocksOfUser.length > 0) {
                        refreshPortfolioTable(stocksOfUser, true);
                    }
                    else{
                        $scope.stocks = stocksOfUser;
                    }
                    //$scope.stocks = stocksOfUser;


                });

        }

        function selectStock(index){

            $scope.selectedIndex = index;
            console.log(index);

            $scope.stock = {
                "_id": $scope.stocks[index]._id,
                "Symbol": $scope.stocks[index].Symbol,
                //"PricePurchased": $scope.stocks[index].PricePurchased,
                //"Quantity": $scope.stocks[index].Quantity,
                "userId": $scope.stocks[index].userId

            };

        }

        //function updateStock(stockToBeUpdated) {
        //
        //    console.log("hello from update stock in portfolio controller");
        //
        //    WatchListService.updateWatchlistStockById(stockToBeUpdated._id, stockToBeUpdated)
        //        .then(function(response) {
        //            console.log(response.data);
        //            $scope.stocks[$scope.selectedIndex] = response.data;
        //        });
        //
        //}

        function getStocksForUser(allStocks, userId, stocksOfUser) {

            for (var i = 0; i < allStocks.length; i++) {

                var s = allStocks[i];

                if(s.userId == userId){

                    stocksOfUser.push(s);

                }
            }

        }




    }
})();