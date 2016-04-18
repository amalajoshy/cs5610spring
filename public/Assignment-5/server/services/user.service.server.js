module.exports = function (app, UserModel, passport, LocalStrategy) {
    "use strict";

    var bcrypt = require("bcrypt-nodejs");

    app.post("/api/login", passport.authenticate("local"), login);
    app.post("/api/isloggedin", loggedin);
    app.post("/api/logout", logout);
    app.post('/api/register', register);

    // find user
    app.get("/api/assignment/user", function (req, res) {
            findAllUsers(req, res);
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

    // admin functions
    app.get("/api/assignment/admin/user", isAdmin, findAllUsers);
    // find user by id
    app.get("/api/assignment/admin/user/:id", isAdmin, findUserById);
    // create user
    app.post("/api/assignment/admin/user", isAdmin, createUser);
    // update user
    app.put("/api/assignment/admin/user/:id", isAdmin, updateUser);
    // delete user
    app.delete("/api/assignment/admin/user/:id", isAdmin, deleteUser);

    passport.use("local", new LocalStrategy(
        function(username, password, done) {
            UserModel.findUserByUsername(username)
                .then(
                    function (user) {
                        if (!user) {
                            return done(null, false);
                        } else if (bcrypt.compareSync(password, user.password)) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    },
                    function (err) {
                        if (err) {
                            return done(err);
                        }
                    }
                );
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(userId, done) {
        UserModel.findUserById(userId)
            .then(function (user) {
            done(null, user);
        });
    });

    function auth(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function isAdmin(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(403);
        } else {
            UserModel
                .findUserById(req.user._id)
                .then(function (user) {
                    if (user) {
                        if (user.roles.indexOf('admin') >= 0) {
                            next();
                            return;
                        }
                    }
                    res.send(403);
                });
        }
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.json(req.isAuthenticated() ? req.user : null);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        UserModel.createUser(newUser)
            .then(function (user) {
                if (user) {
                    req.login(user, function (err) {
                        if (err) {
                            return next(err);
                        }
                        res.json(user);
                    });
                } else {
                    res.json(null);
                }
            });
    }

    function findAllUsers(req, res) {
        UserModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }

    function findUserById (req, res) {
        var userId = req.params.id;
        UserModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            });
    }

    function createUser (req, res) {
        var user = req.body;
        UserModel
            .createUser(user)
            .then(function (users) {
                res.json(users);
            });
    }

    function updateUser (req, res) {
        var userId = req.params.id;
        var newUser = req.body;
        UserModel
            .updateUser(userId, newUser)
            .then(function(user){
                res.json(user);
            });
    }

    function deleteUser (req, res) {
        var userId = req.params.id;
        UserModel
            .deleteUser(userId)
            .then(function(users){
                res.json(users);
            });
    }

    function findUserByCredentials (req, res) {
        var username = req.query.username;
        var password = req.query.password;
        UserModel
             .findUserByCredentials(username, password)
             .then(function(user){
                res.json(user);
            });
    }

    function findUserByUsername (req, res) {
        var username = req.query.username;
        UserModel
            .findUserByUsername(username)
            .then(function(user){
                res.json(user);
            });
    }
}