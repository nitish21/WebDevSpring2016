var mongoose = require("mongoose");
var q = require("q");

module.exports = function (db) {
    var CommentSchema = require("./comment.schema.server")();
    var Comment = mongoose.model("Comment", CommentSchema);

    var api = {


        createStockCommentForUser : createStockCommentForUser,
        findAllStockCommentsForUser :findAllStockCommentsForUser,
        findAllCommentsForStock :findAllCommentsForStock,
        deleteCommentById : deleteCommentById,
        updateCommentById : updateCommentById

    };

    return api;


    function updateCommentById(commentId, newComment) {

        var deferred = q.defer();

        Comment
            .update (
                {_id: commentId},
                {$set: newComment},
                function (err, stats) {
                    if (!err) {
                        console.log(stats);
                        //deferred.resolve(stats);

                        Comment.findById(commentId,
                            function (err, currenComment) {
                                if(err) {
                                    deferred.reject(err);
                                }
                                else {
                                    deferred.resolve(currenComment);
                                }
                            });


                    } else {
                        deferred.reject(err);
                    }
                }
            );

        return deferred.promise;
    }



    function deleteCommentById (commentId) {

        var deferred = q.defer();

        Comment
            .remove (
                {_id: commentId},
                function (err, stats) {
                    if (!err) {
                        //deferred.resolve(stats);

                        Comment.find(function (err, comments) {
                            if (!err) {
                                //deferred.resolve(stats);
                                console.log("inside find() of deleteUserById");
                                console.log(comments);
                                deferred.resolve (comments);


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



    function findAllStockCommentsForUser (userId) {

        var deferred = q.defer ();

        Comment.find (
            {userId : userId},
            function (err, comments) {
                if (!err) {
                    deferred.resolve (comments);
                } else {
                    deferred.reject (err);
                }
            }
        );

        return deferred.promise;
    }

    function findAllCommentsForStock (symbol) {

        var deferred = q.defer ();

        Comment.find (
            {Symbol : symbol},
            function (err, comments) {
                if (!err) {
                    deferred.resolve (comments);
                } else {
                    deferred.reject (err);
                }
            }
        );

        return deferred.promise;
    }


    function createStockCommentForUser(userId, symbol, comment) {

        var deferred = q.defer();

        //var comment_id = "" + (new Date).getTime();

        var d = (new Date).getTime();

        comment['createdDate'] = (new Date).getTime();
        comment['userId'] = userId;
        comment['Symbol'] = symbol;

        console.log(comment);

        Comment.create(comment, function (err, nothing) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
                console.log(userId);
                //deferred.resolve(findUserByUsername(user.username));


                Comment
                    .findOne(
                        {createdDate: d, Symbol: symbol},
                        function (err, comments) {
                            if (!err) {
                                deferred.resolve(comments);
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