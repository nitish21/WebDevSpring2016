(function(){
    angular
        .module("StockPortfolioApp")
        .factory("CommentsService", commentsService);

    function commentsService($http) {


        var api = {

            createStockCommentForUser : createStockCommentForUser,
            findAllStockCommentsForUser :findAllStockCommentsForUser,
            findAllCommentsForStock :findAllCommentsForStock,
            deleteCommentById : deleteCommentById,
            updateCommentById : updateCommentById,
            findAllAbusiveComments : findAllAbusiveComments,
            deleteCommentByIdForAdmin : deleteCommentByIdForAdmin

        };

        return api;


        /////////////////////////////////////////////////////
        // service methods
        /////////////////////////////////////////////////////

        function deleteCommentByIdForAdmin(commentId){


            return $http.delete("/api/project/commentFlagged/"+commentId);

        }


        function findAllAbusiveComments(){

            console.log("/////////////////////////inside find abusive comments/////////////////////////////////////////////////////////");

            return $http.get("/api/project/flaggedComments");

        }




        function createStockCommentForUser(userId, symbol, comment){

            console.log(comment);
            return $http.post("/api/project/user/"+userId+"/" + symbol + "/comment", comment);

        }

        function findAllCommentsForStock(symbol){

            return $http.get("/api/project/stock/"+symbol+"/comment");
        }


        function findAllStockCommentsForUser(userId){

            return $http.get("/api/project/user/"+userId+"/comment");

        }


        function deleteCommentById(commentId){

            return $http.delete("/api/project/comment/"+commentId);

        }



        function  updateCommentById(commentId, newComment){

            return $http.put("/api/project/comment/"+commentId, newComment);

        }





    }
})();