(function(){
    angular
        .module("StockPortfolioApp")
        .controller("DetailController", detailController);

    function detailController($scope,$rootScope, $routeParams, APIStockService, CommentsService) {

        $scope.Symbol = $routeParams.Symbol;
        $scope.CommentsForStock = [];

        $scope.addComment = createComment;
        $scope.deleteComment = deleteComment;
        $scope.updateComment = updateComment;
        $scope.selectComment = selectComment;




        function updateComment(commentToBeUpdated) {

            console.log("hello from update stock in portfolio controller");

            CommentsService.updateCommentById(commentToBeUpdated._id, commentToBeUpdated)
                .then(function(response){
                    console.log(response.data);
                    $scope.CommentsForStock[$scope.selectedIndex] = response.data;
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



            CommentsService.createStockCommentForUser(currentUserId, $scope.Symbol,comment)
                .then(function(response){

                    console.log(response.data);

                    $scope.CommentsForStock.push(response.data);
                });


        }


        APIStockService.findStockBySymbol(
            $scope.Symbol,
            function(response) {
                $scope.stock = response;
                console.log(response);
            }
        )

        CommentsService.findAllCommentsForStock($scope.Symbol)
            .then(function(response) {
                $scope.CommentsForStock = response.data;
                console.log("hello world!");
                console.log(response.data);
            });



    }





})();