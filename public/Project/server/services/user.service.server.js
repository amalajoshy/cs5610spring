module.exports = function (app, UserModel, passport, LocalStrategyForProject) {
    "use strict";

    var bcrypt = require("bcrypt-nodejs");

    app.post("/api/login", passport.authenticate("tixter"), login);
    app.post("/api/isloggedin", loggedin);
    app.post("/api/logout", logout);
    app.post('/api/register', register);

    // find user
    app.get("/api/user", function (req, res) {
        findAllUsers(req, res);
    });
    // find user by id
    app.get("/api/user/:id", findUserById);
    // create user
    app.post("/api/user", createUser);
    // update user
    app.put("/api/user/:id", updateUser);
    // delete user
    app.delete("/api/user/:id", deleteUser);

    passport.use("tixter", new LocalStrategyForProject(
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

    function findAllUsers (req, res) {
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
}