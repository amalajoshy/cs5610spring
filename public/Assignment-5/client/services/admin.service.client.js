/**
 * Created by amala on 04/16/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("FormBuilderApp")
        .factory("AdminService", AdminService);

    function AdminService($rootScope, $http) {
        var service = {
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        function findAllUsers() {
            return $http.get("/api/assignment/admin/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/admin/user", user);
        }

        function findUserById(userId) {
            return $http.get("/api/assignment/admin/user/" + userId);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        }

        function updateUser(userId, user){
            return $http.put("/api/assignment/admin/user/" + userId, user);
        }
    }
})();