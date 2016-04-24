(function () {
    angular
        .module("StockPortfolioApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, $location, APIStockService) {


        $scope.NYSEstock = {};
        $scope.BSEstock = {};
        $scope.bseQuotesDates = [];
        $scope.bseQuotesQuotes = [];
        $scope.nyseQuotesDates = [];
        $scope.nyseQuotesQuotes = [];
        $scope.search = search;

        $scope.searchDone = false;
        //$scope.searchString = $routeParams.searchString;

        //if($scope.searchString) {
        //    search($scope.searchString);
        //}


        initialDisplayOfStocks();


        function initialDisplayOfStocks(){


            getLiveQuotesForIndices();

            APIStockService.getHomeChartInfo(function (response) {

                    console.log(response.query.results.quote);

                    var allQuotes = response.query.results.quote;

                    var nyseQuotes = [];
                    var bseQuotes = [];

                    for(var i=0; i< allQuotes.length;i++){

                        console.log(allQuotes[i]);

                        if(allQuotes[i].Symbol == "%5eBSESN"){
                            bseQuotes.push(allQuotes[i]);
                            $scope.bseQuotesDates.push(allQuotes[i].Date);
                            $scope.bseQuotesQuotes.push(parseFloat(allQuotes[i].Close));
                        }
                        else{
                            nyseQuotes.push(allQuotes[i]);
                            $scope.nyseQuotesDates.push(allQuotes[i].Date);
                            $scope.nyseQuotesQuotes.push(parseFloat(allQuotes[i].Close));
                        }

                    }

                    putDataInChart('#NYSEchartSpace','NYSE',$scope.nyseQuotesDates,$scope.nyseQuotesQuotes);
                    putDataInChart('#BSEchartSpace','BSE',$scope.bseQuotesDates,$scope.bseQuotesQuotes);


            });

        }


        function search(searchString) {

            console.log(searchString);

            APIStockService.searchStockBySearchString(
                searchString,
                function(response){
                    console.log(response);

                    $scope.searchDone = true;

                    $scope.stocks = response;
                });
        }





        function getLiveQuotesForIndices(){

            var stockIndices = [{Symbol : encodeURI("^NYA")}, {Symbol : encodeURI("^BSESN")}];

            console.log(stockIndices);

            APIStockService.findLivePricesOfStocks(stockIndices,
                function(response){
                    console.log("Helllooooooooooo");
                    console.log(response.query.results.quote);

                    if(response.query.results.quote.length != undefined) {


                        console.log("(((((((((((((((((((((((((((((((((((");

                        for (var i = 0; i < response.query.results.quote.length; i++) {
                            //stockIndices[i] = response.query.results.quote[i];

                            console.log(response.query.results.quote[i]);

                            stockIndices[i]['livePrice'] = (response.query.results.quote[i].LastTradePriceOnly);
                            stockIndices[i]['change'] = parseFloat(response.query.results.quote[i].Change);

                            console.log(stockIndices[i]);
                        }
                    }
                    else{

                        console.log("(((((((((((going corrrect(((((((((((((");

                        stockIndices[0]['livePrice'] = (response.query.results.quote.LastTradePriceOnly);
                        stockIndices[0]['change'] = response.query.results.quote.Change;

                    }

                    $scope.NYSEstock = stockIndices[0];
                    $scope.BSEstock = stockIndices[1];

                    console.log("NYSEstock is :");
                    console.log($scope.NYSEstock);

                });



        }


        function putDataInChart(chartSpace,title,dates,quotes){


            console.log($scope.nyseQuotesDates);
            console.log($scope.nyseQuotesQuotes);


            //var dates = ["2016-04-01","2016-04-02","2016-04-03","2016-04-03","2016-04-04"];
            //var prices = [parseFloat("1.123"),parseFloat("2.2434"),parseFloat("3.6324"),parseFloat("4.9"),parseFloat("5.5")];
            //console.log(prices);

            $(chartSpace).highcharts({
                chart: {
                    zoomType: 'x'
                },
                title: {
                    text: title
                },
                subtitle: {
                    text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                },
                xAxis: {
                    title:'Dates',
                    type: 'datetime',
                    categories: dates.reverse()
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
                    data: quotes.reverse()
                }]
            });

        }




    }
})();