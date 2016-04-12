var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, userModel){

    var auth = authorized;

    app.post  ('/api/assignment/login', passport.authenticate('local'), login);
    app.get   ('/api/assignment/loggedin', loggedin);
    app.post  ('/api/assignment/logout', logout);
    app.post  ('/api/assignment/register', register);

    app.post("/api/assignment/user", auth, createUser);
    app.get("/api/assignment/user", findUsers);//finding single or all users

    //app.get("/api/assignment/user/:id", findUserById);//get profile
    //app.post("/api/assignment/user",createUser);//register
    app.put("/api/assignment/user/:id", auth, updateUserById);//update profile
    app.delete("/api/assignment/user/:id", auth, deleteUserById);//delete user


    passport.use(new LocalStrategy(localStrategy));
    //these two are need to enciper and deciper information in the cookie..
    //Note: cookie information is publically available.. so it should be encrypted..
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        userModel
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
        //by end of this step you have already been added to the session
    }


    function login(req, res) {
        //by the time we reach login function we are already authenticated
        var loggedInUser = req.user;
        res.json(loggedInUser);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
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

    function loggedin(req, res) {
        console.log("in loggedin");
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

////////////////////////////////////////////////////////////////////////////////

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        //notify passport that this is the currently logged in user..
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

        //var user = userModel.findUserByCredentials(req.query.username,req.query.password);

        userModel.findUserByCredentials(req.query.username,req.query.password)
            .then(function (user) {
                    res.json (user);
                },
                function (err) {
                    res.status(400).send(err);
                });


    }

    function findUserByUsername(req, res){

        //var user = userModel.findUserByUsername(req.query.username);

        userModel.findUserByUsername(req.query.username)
            .then(function (user) {
                    res.json (user);
                },
                function (err) {
                    res.status(400).send(err);
                });

    }

    function findAllUsers(req, res){

        //var users = userModel.findAllUsers();

        userModel.findAllUsers()
            .then(function (users) {
                    res.json (users);
                },
                function (err) {
                    res.status(400).send(err);
                });

        //
        //res.json(users);
    }

    function findUserById(req, res){

        //var user = userModel.findUserById(req.params.id);

        userModel.findUserById(req.params.id)
            .then(function (user) {
                    res.json (user);
                },
                function (err) {
                    res.status(400).send(err);
                });
        //
        //res.json(user);
    }

    function createUser(req, res){

        var newUser = req.body;

        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        formUserModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return formUserModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return formUserModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return formUserModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )

    }

    function updateUserById(req, res){

        console.log("inside updateUserById of users server service : ");


        var newUser = req.body;

        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }

        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .updateUserById(req.params.id, newUser)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )


    }

    function deleteUserById(req, res){


        if(isAdmin(req.user)) {

            userModel
                .deleteUserById(req.params.id)
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }

    }

}