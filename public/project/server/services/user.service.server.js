var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;


module.exports = function(app,projectUserModel){


    passport.use('project',   new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post  ('/api/project/login',    passport.authenticate('project'), projectLogin);
    app.post  ('/api/project/logout',   projectLogout);
    app.get   ('/api/project/loggedin', projectLoggedin);
    app.post  ('/api/project/register', projectRegister);

    /////////////////////////////////////////////////////////////

    app.get("/api/project/user", findUsers);//finding single or all users
    app.get("/api/project/user/:id", findUserById);//get profile
    app.post("/api/project/user",createUser);//register
    app.put("/api/project/user/:id", updateUserById);//update profile
    app.delete("/api/project/user/:id",deleteUserById);//delete user

    app.put("/api/project/userfollow/:id",follow);//follow user
    app.put("/api/project/userUnfollow/:id",unfollow);//delete user


    /////////////////////////////////////////////////////////////

    function projectLocalStrategy(username, password, done) {

        console.log("inside projectLocalStrategy ::::::::::::::::::");

        projectUserModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function(err) {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                }
            );

    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        if(user.type == 'project') {
            projectUserModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }
    }


    function projectLogin(req, res){
        var user = req.user;
        res.json(user);
    }

    function projectLogout(req, res) {
        req.logout();
        res.send(200);
    }

    function projectLoggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true;
        }
        return false;
    }


    function projectRegister(req, res) {

        var newUser = req.body;
        newUser['roles'] = [];
        newUser.roles.push('member');
        newUser.type = 'project';

        console.log("*************************************");
        console.log(newUser);

        projectUserModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return projectUserModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    /////////////////////////////////////////////////////////////////////////////

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

        console.log("dscdsacdsacadscdsacdsacdsacdsacdsacdcdsacdsacdacdsacadscdacdsacdsacdsacdsccdsacdscdsa");
        var newUser = req.body;

        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["member"];
        }


        console.log(newUser);
        projectUserModel.createUserForAdmin(newUser)
            .then(function (users) {
            console.log(users);
            res.json (users);
        });

    }

    function updateUserById(req, res){

        console.log("inside updateUserById of users server service : ");

        var newUser = req.body;
        console.log(newUser);

        if(!isAdmin(req.user)) {
            console.log("hahhahaaha");
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        console.log("888888888888888888888888888888888888888888888888888888888888888888888");
        console.log(newUser.roles);

        projectUserModel.updateUserById(req.params.id, newUser)
            .then(function (users) {
                //console.log(users);
                res.json (users);
            });

    }

    function deleteUserById(req, res){

        projectUserModel.deleteUserById(req.params.id)
            .then(function (users) {
                console.log(users);
                res.json (users);
            });
    }

};