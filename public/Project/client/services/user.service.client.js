/**
 * Created by amala on 23/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("TixterApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var service = {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            login: login,
            logout: logout,
            register: register
        };
        return service;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function findAllUsers() {
            return $http.get("/api/user");
        }

        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function findUserById(userId) {
            return $http.get("/api/user/" + userId);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/user/" + userId);
        }

        function updateUser(userId, user){
            return $http.put("/api/user/" + userId, user);
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function register(user) {
            return $http.post("/api/register", user);
        }
    }
})();