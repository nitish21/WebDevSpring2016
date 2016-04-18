//var userModel = require("./../models/user.model.js")();

module.exports = function(app,projectUserModel){


    app.get("/api/project/user", findUsers);//finding single or all users
    app.get("/api/project/user/:id", findUserById);//get profile
    app.post("/api/project/user",createUser);//register
    app.put("/api/project/user/:id", updateUserById);//update profile
    app.delete("/api/project/user/:id",deleteUserById);//delete user

    app.put("/api/project/userfollow/:id",follow);//follow user
    app.put("/api/project/userUnfollow/:id",unfollow);//delete user


    function unfollow(req, res){

        console.log("********************************************");
        var unfollowJson = req.body;
        console.log("unfollow json is ");
        console.log(unfollowJson);

        projectUserModel.unfollow(req.params.id, unfollowJson)
            .then(function (bothUsers) {
                console.log("=======================================================================");

                var respJson = {};

                if(bothUsers[0]._id == unfollowJson.whoWantsToUnFollow._id){

                    respJson["whoUnFollowed"] = bothUsers[0];
                    respJson["whom"] = bothUsers[1];

                }else{
                    respJson["whoUnFollowed"] = bothUsers[1];
                    respJson["whom"] = bothUsers[0];
                }

                console.log(bothUsers);

                res.json(respJson);

            });

    }

    function follow(req, res){

        console.log("********************************************");
        var followJson = req.body;
        console.log("follow json is ");
        console.log(followJson);
        projectUserModel.follow(req.params.id, followJson)
            .then(function (bothUsers) {
                console.log("=======================================================================");

                var respJson = {};

                if(bothUsers[0]._id == followJson.whoWantsToFollow._id){

                    respJson["whoFollowed"] = bothUsers[0];
                    respJson["whom"] = bothUsers[1];

                }else{
                    respJson["whoFollowed"] = bothUsers[1];
                    respJson["whom"] = bothUsers[0];
                }

                res.json(respJson);

            });

        //res.json(respJson);

    }

    function findUsers(req, res){

        if(req.query.username && req.query.password){
            findUserByCredentials(req, res);
        }
        else if(req.query.username){
            findUserByUsername(req, res);
        }
        else{
            findAllUsers(req, res);
        }

    }



    function findUserByCredentials(req, res){

        console.log(req.query.username);
        console.log(req.query.password);

        projectUserModel.findUserByCredentials(req.query.username,req.query.password)
            .then(function (user) {
                    res.json (user);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findUserByUsername(req, res){

        projectUserModel.findUserByUsername(req.query.username)
            .then(function (user) {
                    res.json (user);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findAllUsers(req, res){

        projectUserModel.findAllUsers()
            .then(function (users) {
                    res.json (users);
                },
                function (err) {
                    res.status(400).send(err);
                });

    }

    function findUserById(req, res){

        projectUserModel.findUserById(req.params.id)
            .then(function (user) {
                    res.json (user);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function createUser(req, res){

        var user = req.body;
        console.log(user);
        var newUser = projectUserModel.createUser(user)
            .then(function (newUser) {
            console.log(newUser);
            res.json (newUser);
        });

    }

    function updateUserById(req, res){

        console.log("inside updateUserById of users server service : ");

        var newUser = req.body;

        projectUserModel.updateUserById(req.params.id, newUser)
            .then(function (users) {
                console.log(users);
                res.json (users);
            });

    }

    function deleteUserById(req, res){

        userModel.deleteUserById(req.params.id)
            .then(function (users) {
                console.log(users);
                res.json (users);
            });
    }

};