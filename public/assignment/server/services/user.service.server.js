var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt           = require("bcrypt-nodejs");


module.exports = function(app, assignmentUserModel){

    var auth = authorized;

    passport.use('assignment',   new LocalStrategy(assignmentLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    app.post  ('/api/assignment/login', passport.authenticate('assignment'), assignmentLogin);
    app.post  ('/api/assignment/logout',         assignmentLogout);
    app.post  ('/api/assignment/register',       assignmentRegister);
    //app.post  ('/api/assignment/user',     createUser);

    app.get   ('/api/assignment/loggedin', assignmentLoggedin);

    app.get("/api/assignment/user", auth,findUsers);//finding single or all users
    app.get("/api/assignment/user/:id", findUserById);//get profile
    app.post("/api/assignment/user",auth, createUser);//register
    app.put("/api/assignment/user/:id", auth,updateUserById);//update profile

    app.put("/api/assignment/userProfile/:id", auth,updateUserProfile);//update profile

    app.delete("/api/assignment/user/:id",auth,deleteUserById);//delete user


/////////////////////////////////////////////////////////////

    function assignmentLocalStrategy(username, password, done) {

        console.log("inside assignmentLocalStrategy ::::::::::::::::::");

        assignmentUserModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
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
        if(user.type == 'assignment') {
            assignmentUserModel
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

    function assignmentLogin(req, res){
        var user = req.user;
        res.json(user);
    }

    function assignmentLogout(req, res) {
        req.logout();
        res.send(200);
    }

    function assignmentLoggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true;
        }
        return false;
    }

    function assignmentRegister(req, res) {

        var newUser = req.body;
        newUser['roles'] = [];
        newUser.roles.push('member');
        newUser.type = 'assignment';

        console.log("*************************************");
        console.log(newUser);

        assignmentUserModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        //newUser.password = bcrypt.hashSync(newUser.password);
                        console.log("(((((((((((((((((((((((new password is ))))))))))))))))))))))))))))");
                        console.log(newUser.password);
                        return assignmentUserModel.createUser(newUser);
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

        assignmentUserModel.findUserByCredentials(req.query.username,req.query.password)
            .then(function (user) {
                    res.json (user);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findUserByUsername(req, res){

        assignmentUserModel.findUserByUsername(req.query.username)
            .then(function (user) {
                    res.json (user);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findAllUsers(req, res){

        if(isAdmin(req.user)) {
            assignmentUserModel.findAllUsers()
                .then(function (users) {
                        res.json (users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    });
        } else {
            res.status(403);
        }

    }

    function findUserById(req, res){

        assignmentUserModel.findUserById(req.params.id)
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
        newUser.type = 'assignment';

        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["member"];
        }


        console.log(newUser);
        assignmentUserModel.createUserForAdmin(newUser)
            .then(function (users) {
                //console.log(users);
                res.json (users);
            });

    }



    function updateUserProfile(req, res){

        console.log("inside updateUserById of users server service : ");

        var newUser = req.body;
        console.log(newUser);

        //if(!isAdmin(req.user)) {
        //    console.log("hahhahaaha");
        //    delete newUser.roles;
        //}
        //
        //if(typeof newUser.roles == "string") {
        //    newUser.roles = newUser.roles.split(",");
        //}

        console.log("888888888888888888888888888888888888888888888888888888888888888888888");
        console.log(newUser.roles);

        assignmentUserModel.updateUserProfile(req.params.id, newUser)
            .then(function (user) {
                //console.log(users);
                res.json (user);
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

        assignmentUserModel.updateUserById(req.params.id, newUser)
            .then(function (users) {
                //console.log(users);
                res.json (users);
            });

    }

    function deleteUserById(req, res){

        if(isAdmin(req.user)) {
            assignmentUserModel.deleteUserById(req.params.id)
                .then(function (users) {
                    console.log(users);
                    res.json(users);
                });
        }
        else{
            res.status(403);
        }
    }

};