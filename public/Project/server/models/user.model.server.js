module.exports = function (mongoose, db) {
    "use strict";
    var q = require("q");
    var bcrypt = require("bcrypt-nodejs");
    //var users = require("./user.mock.json");
    var UserSchema = require('./user.schema.server.js')(mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);


    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    // get all users
    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find(function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    // get user by id
    function findUserById(userId) {

        var deferred = q.defer();
        UserModel.findById(userId, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    // create user
    function createUser(newUser) {
        var deferred = q.defer();
        this.newUser = newUser;
        var that = this;

        UserModel.findOne({username: newUser.username}, function (err, user) {
            if (err) {
                deferred.reject(err);
            }
            if (user) {
                deferred.resolve(null);
            }
            var newUser = new UserModel(that.newUser);
            newUser.password = bcrypt.hashSync(newUser.password);
            newUser.save(function (err, user) {
                deferred.resolve(user);
            });
        });
        return deferred.promise;
    }

    // update user
    function updateUser(userId, newUser) {
        var deferred = q.defer();
        delete newUser._id;

        UserModel.findByIdAndUpdate(userId, {$set: newUser}, {new: true}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                //UserModel.findById(userId, function(err, user) {
                //    if (err) {
                //        deferred.reject(err);
                //    } else {
                deferred.resolve(user);
                //}
                //});
            }
        });

        return deferred.promise;
    }

    // delete user
    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel.remove({_id: userId}, function (err) {
            if (err) {
                deferred.reject(err);
            } else {
                UserModel.find(function (err, users) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(users);
                    }
                });
            }
        });
        return deferred.promise;
    }

    // get user by credentials
    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        UserModel.findOne({username: username, password: password}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    // get user by username
    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }
};