var mongoose = require("mongoose");
var q = require("q");

module.exports = function (db) {
    var WatchlistSchema = require("./watchlist.schema.server")();
    var Watchlist = mongoose.model("Watchlist", WatchlistSchema);

    var api = {

        createWatchlistStockForUser : createWatchlistStockForUser,
        findAllWatchlistStocksForUser :findAllWatchlistStocksForUser,
        deleteWatchlistStockById : deleteWatchlistStockById,
        //updateWatchlistStockById : updateWatchlistStockById,

        findAllWatchlistStocksForUserWithUsername : findAllWatchlistStocksForUserWithUsername,
        findAllUsernamesWithThisStock : findAllUsernamesWithThisStock

    };

    return api;


    function findAllUsernamesWithThisStock(Symbol){

        var deferred = q.defer ();

        Watchlist.find (
            {Symbol : Symbol},
            function (err, stocks) {
                if (!err) {

                    var usernames = [];

                    for (var i = 0; i < stocks.length; i++) {

                        var stock = stocks[i];

                        if(stock.Symbol == Symbol){

                            usernames.push(stock.username);

                        }
                    }

                    deferred.resolve (stocks);
                } else {
                    deferred.reject (err);
                }
            }
        );

        return deferred.promise;

    }


    function findAllWatchlistStocksForUserWithUsername (username) {



        var deferred = q.defer();

        Watchlist.find (
            {username : username},
            function (err, stocks) {
                if (!err) {
                    deferred.resolve (stocks);
                } else {
                    deferred.reject (err);
                }
            }
        );

        return deferred.promise;
    }


    function deleteWatchlistStockById (stockId) {

        var deferred = q.defer();

        Watchlist
            .remove (
                {_id: stockId},
                function (err, stats) {
                    if (!err) {
                        //deferred.resolve(stats);

                        Watchlist.find(function (err, stocks) {
                            if (!err) {
                                //deferred.resolve(stats);
                                console.log("inside find() of deleteUserById");
                                console.log(stocks);
                                deferred.resolve (stocks);


                            } else {
                                deferred.reject(err);
                            }
                        })


                    } else {
                        deferred.reject(err);
                    }
                }
            );

        return deferred.promise;
    }



    function findAllWatchlistStocksForUser (userId) {


        //console.log("hahahahhahahahahahahhahahahhahahah");
        //
        //var deferred = q.defer();
        //
        ////Watchlist.remove (
        ////    {},
        ////    function (err, stats) {
        ////        if (!err) {
        ////            console.log("success....................");
        ////            deferred.resolve (stats);
        ////        } else {
        ////            deferred.reject (err);
        ////        }
        ////    }
        ////);
        //
        //return deferred.promise;






        var deferred = q.defer ();

        Watchlist.find (
            {userId : userId},
            function (err, stocks) {
                if (!err) {
                    deferred.resolve (stocks);
                } else {
                    deferred.reject (err);
                }
            }
        );

        return deferred.promise;
    }



    function createWatchlistStockForUser(userId,newStock) {

        var deferred = q.defer();

        newStock['userId'] = userId;

        console.log(newStock);

        Watchlist.create(newStock, function (err, nothing) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
                console.log(userId);
                //deferred.resolve(findUserByUsername(user.username));


                Watchlist
                    .findOne(
                        {_id: userId, Symbol:newStock.Symbol},
                        function (err, stock) {
                            if (!err) {
                                deferred.resolve(stock);
                            } else {
                                deferred.reject(err);
                            }
                        }
                    );

            }
        });
        return deferred.promise;


    }

};