var commentsArray = require("./comment.mock.json");

module.exports = function(){
    var api = {
        createStockCommentForUser : createStockCommentForUser,
        findAllStockCommentsForUser :findAllStockCommentsForUser,
        findAllCommentsForStock :findAllCommentsForStock,
        deleteCommentById : deleteCommentById,
        updateCommentById : updateCommentById

    };

    return api;

    function createStockCommentForUser(userId, symbol, comment){

        var newComment = {
            "_id":(new Date).getTime(),
            "Symbol": symbol,
            "userId":userId,
            "Comment":comment.Comment,
            "username":comment.username
        };

        commentsArray.push(newComment);

        return newComment;
    }


    function findAllCommentsForStock(symbol){

        var commentsMatchingSymbol = [];

        for (var i = 0; i < commentsArray.length; i++) {

            var comment = commentsArray[i];

            if(comment.Symbol == symbol){

                commentsMatchingSymbol.push(comment);

            }
        }

        return commentsMatchingSymbol;

    }


    function findAllStockCommentsForUser(userId){

        var commentsMatchingUserId = [];

        for (var i = 0; i < commentsArray.length; i++) {

            var comment = commentsArray[i];

            if(comment.userId == userId){

                commentsMatchingUserId.push(comment);

            }
        }

        return commentsMatchingUserId;

    }

    function deleteCommentById(commentId){
        //Accepts parameter stock id and callback function
        //Iterates over array of stocks looking for stock whose id is stock id parameter
        //If found, removes stock from current array of stocks
        //Calls back with remaining array of stocks

        for (var i = 0; i < commentsArray.length; i++) {

            var comment = commentsArray[i];

            if(comment._id == commentId){

                commentsArray.splice(i, 1);

            }
        }

        return commentsArray;

    }

    function  updateCommentById(commentId, newComment){
        //Accepts parameter stock id, new stock object, and callback function
        //Iterates over array of stocks looking for stock whose id is stock id parameter
        //If found, updates stock object with new stock values
        //Calls back with update stock

        for (var i = 0; i < commentsArray.length; i++) {

            var updatedComment = commentsArray[i];

            if(updatedComment._id == commentId){

                commentsArray[i] = {
                    "_id":newComment._id,
                    "Symbol":newComment.Symbol,
                    "userId":newComment.userId,
                    "username":newComment.username,
                    "Comment":newComment.Comment,
                    "abuseFlag": newComment.abuseFlag

                };

                return commentsArray[i];

            }

        }


    }










}