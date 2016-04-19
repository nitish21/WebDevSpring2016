(function () {
    angular
        .module("StockPortfolioApp")
        .controller("PortfolioController", PortfolioController);

    function PortfolioController($scope, $rootScope, $location, PortfolioService, APIStockService) {

        $scope.addStock = addStock;
        $scope.updateStock = updateStock;
        $scope.deleteStock = deleteStock;
        $scope.selectStock = selectStock;
        $scope.stocks=[];


        initialDisplayOfStocks();


        function initialDisplayOfStocks(){

            var currentUserStocks = [];


            PortfolioService.findAllStocksForUser($rootScope.user._id)
                .then(function (response) {
                    angular.copy(response.data, currentUserStocks);

                    refreshPortfolioTable(currentUserStocks,true);

                });


        }


        function refreshPortfolioTable(currentUserStocks,flag){

            APIStockService.findLivePricesOfStocks(currentUserStocks,
                function(response){
                    //console.log(response.query.results.quote);

                    if(response.query.results.quote.length != undefined) {

                        console.log("(((((((((((((((((((((((((((((((((((");

                        for (var i = 0; i < response.query.results.quote.length; i++) {
                            currentUserStocks[i]['livePrice'] = (response.query.results.quote[i].LastTradePriceOnly);
                            currentUserStocks[i]['change'] = response.query.results.quote[i].Change;
                            currentUserStocks[i]['overallGain'] = ((currentUserStocks[i].livePrice * currentUserStocks[i].Quantity) - (currentUserStocks[i].PricePurchased * currentUserStocks[i].Quantity)).toFixed(1);
                            currentUserStocks[i]['overallGainPercent'] = ((currentUserStocks[i]['overallGain'] / (currentUserStocks[i].PricePurchased * currentUserStocks[i].Quantity)) * 100).toFixed(1);
                            currentUserStocks[i]['latestValue'] = (currentUserStocks[i].livePrice * currentUserStocks[i].Quantity).toFixed(1);
                        }
                    }
                    else{

                        console.log("(((((((((((going corrrect(((((((((((((");

                        currentUserStocks[0]['livePrice'] = (response.query.results.quote.LastTradePriceOnly);
                        currentUserStocks[0]['change'] = response.query.results.quote.Change;
                        currentUserStocks[0]['overallGain'] = ((currentUserStocks[0].livePrice * currentUserStocks[0].Quantity) - (currentUserStocks[0].PricePurchased * currentUserStocks[0].Quantity)).toFixed(1);
                        currentUserStocks[0]['overallGainPercent'] = ((currentUserStocks[0]['overallGain'] / (currentUserStocks[0].PricePurchased * currentUserStocks[0].Quantity)) * 100).toFixed(1);
                        currentUserStocks[0]['latestValue'] = (currentUserStocks[0].livePrice * currentUserStocks[0].Quantity).toFixed(1);

                    }

                    if(flag==true) {
                        angular.copy(currentUserStocks, $scope.stocks);
                    }
                });

        }

        function addStock(newStock){

            console.log("hello from create stock iin portfolio controller");

            var loggedInUser = $rootScope.user;

            console.log("logged in user : " + loggedInUser);



            PortfolioService.createStockForUser(loggedInUser._id, newStock)
                .then(function(response){

                    console.log(response.data);
                    $scope.stocks.push(response.data);

                    refreshPortfolioTable($scope.stocks,false);

                    $scope.stock = {};
                    $scope.selectedIndex = null;

                });


        }

        function deleteStock(index){

            console.log("hello from delete stock in portfolio controller");

            var stockToBeDeleted = $scope.stocks[index];

            var loggedInUser = $rootScope.user;

            console.log("logged in user : " + loggedInUser);

            PortfolioService.deleteStockById(stockToBeDeleted._id)
                .then(function(responseAllStocks){
                    //$scope.stocks = response;

                    console.log(responseAllStocks.data);

                    var stocksOfUser = [];

                    getStocksForUser(responseAllStocks.data, loggedInUser._id, stocksOfUser);

                    refreshPortfolioTable(stocksOfUser,true);

                    console.log("After refreshPortfolioTable : ");
                    console.log(stocksOfUser);

                    //$scope.stocks = stocksOfUser;


                });


        }

        function selectStock(index){

            $scope.selectedIndex = index;
            console.log(index);

            $scope.stock = {
                "_id": $scope.stocks[index]._id,
                "Symbol": $scope.stocks[index].Symbol,
                "PricePurchased": $scope.stocks[index].PricePurchased,
                "Quantity": $scope.stocks[index].Quantity,
                "userId": $scope.stocks[index].userId

            };

        }

        function updateStock(stockToBeUpdated) {

            console.log("hello from update stock in portfolio controller");

            PortfolioService.updateStockById(stockToBeUpdated._id, stockToBeUpdated)
                .then(function(response){
                    console.log(response.data);
                    $scope.stocks[$scope.selectedIndex] = response.data;
                    refreshPortfolioTable($scope.stocks,false);
                    $scope.stock = null;
                });

        }

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