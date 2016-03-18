var userModel = require("./../models/user.model.js")();

module.exports = function(app){


    app.get("/api/assignment/user", findUsers);//finding single or all users
    app.get("/api/assignment/user/:id", findUserById);//get profile
    app.post("/api/assignment/user",createUser);//register
    app.put("/api/assignment/user/:id", updateUserById);//update profile
    app.delete("/api/assignment/user/:id",deleteUserById);//delete user

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

        var user = userModel.findUserByCredentials(req.query.username,req.query.password);
        console.log(user);
        res.json(user);
    }

    function findUserByUsername(req, res){

        var user = userModel.findUserByUsername(req.query.username);
        res.json(user);
    }

    function findAllUsers(req, res){

        var users = userModel.findAllUsers();
        res.json(users);
    }

    function findUserById(req, res){

        var user = userModel.findUserById(req.params.id);
        res.json(user);
    }

    function createUser(req, res){

        var user = req.body;
        var newUser = userModel.createUser(user);
        res.json(newUser);
    }

    function updateUserById(req, res){

        var newuser = req.body;
        var users = userModel.updateUserById(req.params.id, newuser);
        res.json(users);
    }

    function deleteUserById(req, res){

        var users = userModel.deleteUserById(req.params.id);
        res.json(users);
    }

}