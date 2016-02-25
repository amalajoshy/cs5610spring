/**
 * Created by amala on 23/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var services = {
            users : [
                {_id: 123, firstName: "Alice", lastName: "Wonderland", username: "alice", password: "alice", roles: ["student"]},
                {_id: 234, firstName: "Bob", lastName: "Hope", username: "bob", password: "bob", roles: ["admin"]},
                {_id: 345, firstName: "Charlie", lastName: "Brown", username: "charlie", password: " charlie ", roles: ["faculty"]},
                {_id: 456, firstName: "Dan", lastName: "Craig", username: "dan", password: "dan", roles: ["faculty", "admin"]},
                {_id: 567, firstName: "Edward", lastName: "Norton", username: "ed", password: "ed", roles: ["student"]}],

            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return services;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            var new_user = {
                _id: (new Date()).getTime(),
                username: user.username,
                password: user.password
            };
            services.users.push(new_user);
            callback(new_user);
            return new_user;
        }

        function findUserByCredentials(username, password, callback) {
            for (var u in services.users) {
                if (services.users[u].username === username && services.users[u].password === password) {
                    callback(services.users[u]);
                    return services.users[u];
                }
            }
            callback(null);
            return null;
        }

        function deleteUserById(userId, callback){
            for (var u in services.users) {
                if (services.users[u]._id === userId) {
                    services.users.splice(u, 1);
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback){
            for (var u in services.users) {
                if (services.users[u]._id === userId) {
                    services.users[u].firstName = user.firstName;
                    services.users[u].lastName = user.lastName;
                    services.users[u].password = user.password;
                    callback(services.users[u]);
                    return services.users[u];
                }
                else
                    callback(null);
            }
        }
    }
})();
