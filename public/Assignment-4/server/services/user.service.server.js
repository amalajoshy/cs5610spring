module.exports = function (app, model) {
    "use strict";

    // find user
    app.get("/api/assignment/user", function (req, res) {
        if ("username" in req.query) {
            if ("password" in req.query) {
                findUserByCredentials(req, res);
            } else {
                findUserByUsername(req, res);
            }
        } else {
            findAllUsers(req, res);
        }
    });
    // find user by id
    app.get("/api/assignment/user/:id", findUserById);
    // create user
    app.post("/api/assignment/user", createUser);
    // update user
    app.put("/api/assignment/user/:id", updateUser);
    // delete user
    app.delete("/api/assignment/user/:id", deleteUser);
    // find user by username
    app.get("/api/assignment/user?username=:username", findUserByUsername);

    function findAllUsers (req, res) {
        model
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }

    function findUserById (req, res) {
        var userId = req.params.id;
        model
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            });
    }

    function createUser (req, res) {
        var user = req.body;
        model
            .createUser(user)
            .then(function (users) {
                res.json(users);
            });
    }

    function updateUser (req, res) {
        var userId = req.params.id;
        var newUser = req.body;
        model
            .updateUser(userId, newUser)
            .then(function(user){
                res.json(user);
            });
    }

    function deleteUser (req, res) {
        var userId = req.params.id;
        model
            .deleteUser(userId)
            .then(function(users){
                res.json(users);
            });
    }

    function findUserByCredentials (req, res) {
        var username = req.query.username;
        var password = req.query.password;
         model
             .findUserByCredentials(username, password)
             .then(function(user){
                res.json(user);
            });
    }

    function findUserByUsername (req, res) {
        var username = req.query.username;
        model
            .findUserByUsername(username)
            .then(function(user){
                res.json(user);
            });
    }
}