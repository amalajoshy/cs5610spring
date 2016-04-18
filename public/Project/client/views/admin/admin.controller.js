/**
 * Created by amala on 28/02/16.
 */
(function () {
    'use strict';

    /*global angular*/
    angular
        .module("TixterApp")
        .controller("AdminController", adminController);

    function adminController($scope, $location, UserService, $rootScope) {
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;
        var user = $rootScope.currentUser;
        $scope.users = UserService.findAllUsers($.noop);
        console.log($scope.users);

        function addUser(user) {
            var new_user = UserService.createUser(user, $.noop);
            $scope.users.push(new_user);
        }

        function updateUser(user) {
            var userId = user.user_id;
            var updated_user = UserService.updateUserById(userId, user, $.noop);
        }

        function deleteUser(index) {
            $scope.users.splice(index, 1);
        }

        function selectUser(user, index) {
            $scope.selectedUserIndex = index;
            $scope.user = user;
            $scope.user._id = $scope.users[index]._id;
            $scope.user.username = $scope.users[index].username;
            $scope.user.password = $scope.users[index].password;
            $scope.user.roles = $scope.users[index].roles;
            console.log($scope.user);
        }
    }
}());