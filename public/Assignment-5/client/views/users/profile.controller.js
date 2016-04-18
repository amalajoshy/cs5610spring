/**
 * Created by amala on 24/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, UserService, $location, $rootScope) {
        $scope.error = null;
        $scope.message = null;
        $scope.updateUser = updateUser;

        if ($rootScope.currentUser) {
            $scope.currentUser = $rootScope.currentUser;
        } else {
            UserService.getCurrentUser()
                .then(function(response) {
                    $rootScope.currentUser = response.data;
                    $scope.currentUser = $rootScope.currentUser;
                    if (!$scope.currentUser) {
                        $location.url("/");
                    }
                });
        }

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
            if (!user.emails[0]) {
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

            UserService.updateUser(user._id, user)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        UserService.setCurrentUser(user);
                        $scope.currentUser = $rootScope.currentUser;
                        $scope.message = "User updated successfully";
                    } else {
                        $scope.error = "Unable to update the user";
                    }
            });
        }
    }
})();