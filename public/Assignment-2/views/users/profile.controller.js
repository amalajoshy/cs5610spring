/**
 * Created by amala on 24/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, UserService, $location) {

        $scope.error = null;
        $scope.message = null;

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url("/");
        }

        $scope.updateUser = updateUser;

        function updateUser(user) {
            $scope.error = null;
            $scope.message = null;

            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password) {
                $scope.message = "Please provide a password";
                return;
            }
            if (!user.firstName) {
                $scope.message = "Please provide a firstname";
                return;
            }
            if (!user.lastName) {
                $scope.message = "Please provide a lastname";
                return;
            }
            if (!user.email) {
                $scope.message = "Please provide a valid email address";
                return;
            }
            if (user.username !== $scope.currentUser.username) {
                var ex_user = UserService.findUserByCredentials(user.username, user.password, $.noop);
                if (ex_user !== null) {
                    $scope.message = "User already exists";
                    return;
                }
            }
            $scope.currentUser = UserService.updateUser(user._id, user, $.noop);

            if (user) {
                $scope.message = "User updated successfully";
                UserService.setCurrentUser($scope.currentUser);
            } else {
                $scope.message = "Unable to update the user";
            }
        }
    }
})();