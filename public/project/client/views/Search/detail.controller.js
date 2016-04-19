(function(){
    angular
        .module("StockPortfolioApp")
        .controller("DetailController", detailController);

    function detailController($scope,$rootScope, $routeParams, $location, APIStockService, CommentsService, PortfolioService, WatchListService) {

        $scope.Symbol = $routeParams.Symbol;
        //$scope.addStock = null;
        $scope.CommentsForStock = [];
        $scope.watchUsernames = [];
        $scope.selectedIndex = -1;

        $scope.addComment = createComment;
        $scope.deleteComment = deleteComment;
        $scope.updateComment = updateComment;
        $scope.selectComment = selectComment;
        $scope.showOneYearChart = showOneYearChart;
        $scope.showOneMonthChart = showOneMonthChart;
        $scope.addStockToPortfolio = addStockToPortfolio;
        $scope.addStockToWatchlist = addStockToWatchlist;

        $scope.setPortfolioFlagForAdding = setPortfolioFlagForAdding;
        $scope.setWatchListFlagForAdding = setWatchListFlagForAdding;
        $scope.reportComment = reportComment;
        $scope.portfolioFlag = false;
        $scope.watchlistFlag = true;


        APIStockService.findStockBySymbol(
            $scope.Symbol,
            function(response) {
                $scope.stock = response;
                $scope.stock['Change'] = $scope.stock['Change'].toFixed(2);
                $scope.stock['ChangePercent'] = $scope.stock['ChangePercent'].toFixed(2);
                console.log(response);

            }
        );


        showOneMonthChart();


        WatchListService.findAllUsernamesWithThisStock($scope.Symbol)
            .then(function(response){
                $scope.watchUsernames = response.data;
                console.log("hello world from watherss!");
                console.log(response.data);

            });

        CommentsService.findAllCommentsForStock($scope.Symbol)
            .then(function(response) {
                $scope.CommentsForStock = response.data;
                console.log("hello world!");
                console.log(response.data);
            });





        function addStockToPortfolio(addStock){

            addStock['Symbol'] = $scope.Symbol;
            addStock['Name'] = $scope.stock.Name;
            addStock['username'] = $rootScope.user.username;

            console.log(addStock);

            PortfolioService.createStockForUser($rootScope.user._id, addStock)
                .then(function(response) {
                        $location.path('/portfolio');
                    }
                );



        }

        function addStockToWatchlist(){

            var addStock = {};

            addStock['Symbol'] = $scope.Symbol;
            addStock['Name'] = $scope.stock.Name;
            addStock['username'] = $rootScope.user.username;


            console.log(addStock);

            WatchListService.createWatchlistStockForUser($rootScope.user._id, addStock)
                .then(function(response) {
                        $location.path('/watchlist');
                    }
                );



        }


        function setPortfolioFlagForAdding(){
            $scope.portfolioFlag = true;
            console.log($scope.portfolioFlag);
        }



        function setWatchListFlagForAdding(){
            $scope.watchlistFlag = true;
            console.log($scope.watchlistFlag);
        }


        function convertMonthDates(arr){

            var convertedArray = [];
            var months = ['X','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];


            for (var i = 0; i < arr.length; i++) {

                var d = new Date(arr[i]);
                var da = d.getDate()+1;
                var mon = d.getMonth() + 1;
                var yr = d.getFullYear();

                convertedArray.push(da + " " + months[mon] + "," + yr%100);

            }

            console.log("converted array is :");
            console.log(convertedArray);

            return convertedArray;

        }


        function showOneMonthChart(){

            APIStockService.getChartInfo(
                30,
                'Day',
                $scope.Symbol,
                function(response) {
                    //$scope.stock = response;
                    console.log("inside response of getChartInfo in detailController : ");
                    console.log(response);
                    console.log("above this shud be the response...");

                    console.log(response.Elements[0].DataSeries.close.values);

                    console.log("above this shud be the list of stock prices...");

                    $('#chartSpace').highcharts({
                        chart: {
                            zoomType: 'x'
                        },
                        title: {
                            text: $scope.stock.Name
                        },
                        subtitle: {
                            text: document.ontouchstart === undefined ?
                                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                        },
                        xAxis: {
                            title:'Dates',
                            type: 'datetime',
                            categories: convertMonthDates(response.Dates)
                        },
                        yAxis: {
                            title: {
                                text: 'Stock Price'
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        plotOptions: {
                            area: {
                                fillColor: {
                                    linearGradient: {
                                        x1: 0,
                                        y1: 0,
                                        x2: 0,
                                        y2: 1
                                    },
                                    stops: [
                                        [0, Highcharts.getOptions().colors[0]],
                                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                    ]
                                },
                                marker: {
                                    radius: 2
                                },
                                lineWidth: 1,
                                states: {
                                    hover: {
                                        lineWidth: 1
                                    }
                                },
                                threshold: null
                            }
                        },

                        series: [{
                            type: 'area',
                            name: 'Close Price',
                            data: response.Elements[0].DataSeries.close.values
                        }]
                    });

                }
            );

        }



        //function getChart(response)

        function showOneYearChart() {

            console.log("hello from update stock in portfolio controller");

            APIStockService.getChartInfo(
                365,
                'Day',
                $scope.Symbol,
                function(response) {
                    //$scope.stock = response;
                    console.log("inside response of getChartInfo in showOneYearChart() in detailController : ");
                    console.log(response);
                    console.log("above this shud be the response...");

                    console.log(response.Elements[0].DataSeries.close.values);

                    console.log("above this shud be the list of stock prices...");

                    Highcharts.chart('chartSpace', {

                        xAxis: {
                            categories: response.Dates
                        },

                        series: [{
                            name: $scope.Symbol + ' share price over the past year',
                            data: response.Elements[0].DataSeries.close.values
                        }]
                    });

                }
            );

        }







        function updateComment(commentToBeUpdated) {

            console.log("hello from update stock in portfolio controller");

            console.log(commentToBeUpdated);

            commentToBeUpdated['username'] = $rootScope.user.username;

            var newComment = {};

            newComment.Symbol = commentToBeUpdated.Symbol;
            newComment.userId = commentToBeUpdated.userId;
            newComment.username = commentToBeUpdated.username;
            newComment.Comment = commentToBeUpdated.Comment;
            newComment.createdDate = commentToBeUpdated.createdDate;
            newComment.abuseFlag = commentToBeUpdated.abuseFlag;


            CommentsService.updateCommentById(commentToBeUpdated._id, newComment)
                .then(function(response){
                    console.log(response.data);
                    $scope.CommentsForStock[$scope.selectedIndex] = response.data;
                    $scope.selectedIndex = -1;
                    $scope.comment = {};
                });

        }

        function selectComment(index){

            $scope.selectedIndex = index;
            console.log(index);

            $scope.comment = {
                "_id": $scope.CommentsForStock[index]._id,
                "Symbol": $scope.CommentsForStock[index].Symbol,
                "userId": $scope.CommentsForStock[index].userId,
                "Comment": $scope.CommentsForStock[index].Comment,

            };

        }

        function deleteComment(index){

            console.log("hello from delete stock in portfolio controller");

            var commentToBeDeleted = $scope.CommentsForStock[index];

            var loggedInUser = $rootScope.user;

            console.log("logged in user : " + loggedInUser);

            CommentsService.deleteCommentById(commentToBeDeleted._id)
                .then(function(responseAllComments){
                    //$scope.stocks = response;

                    console.log(responseAllComments.data);

                    var commentsForStock = [];

                    getAllCommentsForStock(responseAllComments.data, $scope.Symbol, commentsForStock);

                    console.log(commentsForStock);

                    $scope.CommentsForStock = commentsForStock;


                });


        }

        function getAllCommentsForStock(allComments, symbol, commentsForStock) {

            for (var i = 0; i < allComments.length; i++) {

                var c = allComments[i];

                if(c.Symbol == symbol){

                    commentsForStock.push(c);

                }
            }

        }


        function createComment(comment) {

            console.log("inside create comment in detail controller");
            console.log(comment);
            var currentUserId = $rootScope.user._id;

            comment['username'] = $rootScope.user.username;
            comment['abuseFlag'] = false;

            CommentsService.createStockCommentForUser(currentUserId, $scope.Symbol,comment)
                .then(function(response){

                    console.log("inside createStockCommentForUser :----------------------");
                    console.log(response.data);

                    $scope.comment = {};

                    $scope.CommentsForStock.push(response.data);
                });


        }


        function reportComment(commentToBeUpdated){

            commentToBeUpdated['abuseFlag'] = true;

            //updateComment(commentToBeUpdated);

            var newComment = {};

            newComment.Symbol = commentToBeUpdated.Symbol;
            newComment.userId = commentToBeUpdated.userId;
            newComment.username = commentToBeUpdated.username;
            newComment.Comment = commentToBeUpdated.Comment;
            newComment.createdDate = commentToBeUpdated.createdDate;
            newComment.abuseFlag = commentToBeUpdated.abuseFlag;


            CommentsService.updateCommentById(commentToBeUpdated._id, newComment)
                .then(function(response){
                    console.log(response.data);
                    $scope.CommentsForStock[$scope.selectedIndex] = response.data;


                });

        }






    }





})();