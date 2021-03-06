module.exports = function (mongoose, db) {
    "use strict";
    var q = require("q");
    var bcrypt = require("bcrypt-nodejs");
    var UserSchema = require('./user.schema.server.js')(mongoose);
    var userModel = mongoose.model("userModel", UserSchema);

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
        userModel.find(function (err, users) {
            if (err) {
                deferred.reject(err);
                console.log("find all users errors: " + err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    // get user by id
    function findUserById(userId) {

        var deferred = q.defer();
        userModel.findById(userId, function (err, user) {
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

        userModel.findOne({username: newUser.username}, function(err, user) {
            if (err) {
                deferred.reject(err);
            }
            if (user) {
                console.log("reached here");
                deferred.resolve(null);
            }
            var newUser = new userModel(that.newUser);
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
        console.log(newUser);
        delete newUser._id;
        userModel.update({_id: userId}, {$set: newUser}, function(err) {
            if(err) {
                deferred.reject(err);
            } else {
                userModel.findById(userId, function(err, user) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                });
            }
        });

        return deferred.promise;
    }

    // delete user
    function deleteUser(userId) {
        var deferred = q.defer();
        userModel.remove({_id: userId},function(err, users){
            if (err) {
                deferred.reject(err);
            } else {
                userModel.find(function(err, users){
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
        userModel.findOne({username: username, password : password}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    // get user by username
    function findUserByUsername(username) {
        var deferred = q.defer();
        userModel.findOne({username: username}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }
};