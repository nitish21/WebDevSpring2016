//var commentModel = require("./../models/comment.model.js")();

module.exports = function(app, commentModel){

    app.post("/api/project/user/:userId/:symbol/comment",createStockCommentForUser);//create Comment For User

    app.get("/api/project/user/:userId/comment",findAllStockCommentsForUser);//findAllStockCommentsForUser

    app.delete("/api/project/comment/:commentId",deleteCommentById);//delete coment

    app.put("/api/project/comment/:commentId", updateCommentById);//update coment

    app.get("/api/project/stock/:symbol/comment",findAllCommentsForStock);


    ////////////////////////////////////////////////////////////////////

    function findAllCommentsForStock (req, res) {

        console.log("inside findAllCommentsForStock of comment server service ");

        var symbol = req.params.symbol;

        console.log("current symbol : " + symbol);

        var comments = commentModel.findAllCommentsForStock(symbol)
            .then(function (comments) {
                res.json(comments);
            });


    }


    function findAllStockCommentsForUser (req, res) {

        console.log("inside findAllStockCommentsForUser of comment server service ");

        var userId = req.params.userId;

        commentModel.findAllStockCommentsForUser(userId)
            .then(function (comments) {
            res.json(comments);
        });
        //res.json(comments);

    }

    function createStockCommentForUser(req, res){

        console.log("inside createStockCommentForUser of comment server service ");

        var newComment = req.body;

        console.log(req.body);

        var userId = req.params.userId;
        var symbol = req.params.symbol;

        commentModel.createStockCommentForUser(userId,symbol,newComment)
            .then(function (comment) {
                console.log("inside then() of createStockCommentForUser :::::::::::::::::::::::::::::");
                console.log(comment);
                res.json(comment);
            });

        //console.log(comment);
        //res.json(comment);
    }


    function deleteCommentById (req, res) {

        console.log("inside deleteCommentById of comments server service ");

        var commentId = req.params.commentId;

        commentModel.deleteCommentById(commentId)
            .then(function (comments) {
                res.json(comments);
            });


    }


    function updateCommentById (req, res) {

        console.log("inside updateStockById of comments server service ");

        var newComment = req.body;

        console.log(newComment);

        commentModel.updateCommentById(req.params.commentId, newComment)
            .then(function (comment) {
                res.json(comment);
            });

        //console.log("updated comment : ");
        //console.log(comment);
        //
        //res.json(comment);

    }


}