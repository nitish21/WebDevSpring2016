var mongoose = require("mongoose");
var q = require("q");

module.exports = function (db) {
    var PortfolioSchema = require("./portfolio.schema.server")();
    var Portfolio = mongoose.model("Portfolio", PortfolioSchema);

    var api = {

        createStockForUser: createStockForUser,
        findAllStocksForUser: findAllStocksForUser,
        deleteStockById: deleteStockById,
        updateStockById: updateStockById

    };

    return api;


    function updateStockById(stockId, newStock) {

        var deferred = q.defer();

        Portfolio
            .update (
                {_id: stockId},
                {$set: newStock},
                function (err, stats) {
                    if (!err) {
                        console.log(stats);
                        //deferred.resolve(stats);

                        Portfolio.findById(stockId,
                            function (err, currentStock) {
                                if(err) {
                                    deferred.reject(err);
                                }
                                else {
                                    deferred.resolve(currentStock);
                                }
                            });


                    } else {
                        deferred.reject(err);
                    }
                }
            );

        return deferred.promise;
    }



    function deleteStockById (stockId) {

        var deferred = q.defer();

        Portfolio
            .remove (
                {_id: stockId},
                function (err, stats) {
                    if (!err) {
                        //deferred.resolve(stats);

                        Portfolio.find(function (err, stocks) {
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



    function findAllStocksForUser (userId) {

        var deferred = q.defer ();

        Portfolio.find (
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



    function createStockForUser(userId, newStock) {

        var deferred = q.defer();

        newStock['userId'] = userId;

        console.log(newStock);

        Portfolio.create(newStock, function (err, nothing) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
                console.log(userId);
                //deferred.resolve(findUserByUsername(user.username));


                Portfolio
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