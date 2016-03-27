module.exports = function(app) {

    "use strict";
    var users = require("./user.mock.json");

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
    function findAllUsers(){
        return users;
    }

    // get user by id
    function findUserById(userId) {
        for (var u in users) {
            if (users[u]._id == userId) {
               return users[u];
            }
        }
        return null;
    }

    // create user
    function createUser (user) {
        var newUser = {_id: Math.round(Math.random()*1000), username: user.username, password: user.password, email: user.email};
        users.push(newUser);
        return newUser;
    }

    // update user
    function updateUser (userId, newUser) {
        for (var u in users) {
            if (users[u]._id == userId) {
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                users[u].password = newUser.password;
                return users[u];
            }
        }
        return null;
    }

    // delete user
    function deleteUser (userId) {
        for (var u in users) {
            if (users[u]._id == userId) {
                users.splice(u, 1);
            }
        }
        return users;
    }

    // get user by credentials
    function findUserByCredentials(username, password) {
        for (var u in users) {
            if (users[u].username === username && users[u].password === password) {
                return users[u];
            }
        }
        return null;
    }

    // get user by username
    function findUserByUsername (username) {
        for (var u in users) {
            if (users[u].username === username) {
                return users[u];
            }
        }
        return null;
    }
};