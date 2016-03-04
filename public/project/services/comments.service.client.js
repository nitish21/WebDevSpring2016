(function(){
    angular
        .module("StockPortfolioApp")
        .factory("CommentsService", commentsService);

    function commentsService($http) {

        //"Comment": "NFLX"
        var commentsArray = [
            {"_id": "000", "Symbol": "AAPL", "userId": 123,"Comment": "Apple is going up!!!!"},
            {"_id": "010", "Symbol": "GOOG", "userId": 123,"Comment" : "Google is going up too!!!!"},
            {"_id": "020", "Symbol": "NTAP", "userId": 234,"Comment" : "NetApp will do well soon!!!"}
        ];


        var api = {

            createStockCommentForUser : createStockCommentForUser,
            findAllStockCommentsForUser :findAllStockCommentsForUser,
            deleteCommentById : deleteCommentById,
            updateCommentId : updateCommentId

        };

        return api;


        /////////////////////////////////////////////////////
        // service methods
        /////////////////////////////////////////////////////

        function createStockCommentForUser(userId, symbol, comment, callback){
            //Accepts parameters user id, stock object, and callback function
            //Adds property called _id with unique id. You can use (new Date).getTime() to create a unique number
            //Adds property called userId equal to user id parameter
            //Adds new stock to local array of stocks
            //Calls back with new stock

            var newComment = {
                "_id":(new Date).getTime(),
                "Symbol": symbol,
                "userId":userId,
                "Comment":comment.text
            };

            commentsArray.push(newComment);

            callback(newComment);
        }

        function findAllStockCommentsForUser(userId, callback){
            //Accepts parameter user id, and callback function
            //Iterates over the array of current stocks looking for stocks whose user id is parameter user id
            //Calls back with found stocks for user id parameter, empty array otherwise

            var commentsMatchingUserId = [];

            for (var i = 0; i < commentsArray.length; i++) {

                var comment = commentsArray[i];

                if(comment.userId == userId){

                    commentsMatchingUserId.push(comment);

                }
            }

            callback(commentsMatchingUserId);

        }

        function deleteCommentById(commentId, callback){
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

            callback(commentsArray);

        }

        function  updateCommentId(commentId, newComment, callback){
            //Accepts parameter stock id, new stock object, and callback function
            //Iterates over array of stocks looking for stock whose id is stock id parameter
            //If found, updates stock object with new stock values
            //Calls back with update stock

            for (var i = 0; i < commentsArray.length; i++) {

                var updatedComment = commentsArray[i];

                if(updatedComment._id == commentId){

                    updatedComment = {
                        "_id":newComment._id,
                        "Symbol":newComment.Symbol,
                        "userId":newComment.userId,
                        "Comment":newComment.text

                    };

                    callback(updatedComment);

                }

            }


        }





    }
})();