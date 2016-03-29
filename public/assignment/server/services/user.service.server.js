module.exports = function(app, userModel){

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

        var user = req.body;
        var newUser = userModel.createUser(user);

        userModel.createUser(user)
            .then(function (newUser) {
                console.log(newUser);
                res.json (newUser);
            })

    }

    function updateUserById(req, res){

        //var newuser = req.body;

        //var users = userModel.updateUserById(req.params.id, newuser);


        userModel.updateUserById(req.params.id, newuser)
            .then(function (users) {
                console.log(users);
                res.json (users);
            });

        //res.json(users);
    }

    function deleteUserById(req, res){

        //var users = userModel.deleteUserById(req.params.id);

        userModel.deleteUserById(req.params.id)
            .then(function (users) {
                console.log(users);
                res.json (users);
            })

        //res.json(users);
    }

}