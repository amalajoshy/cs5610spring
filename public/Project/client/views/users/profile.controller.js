/**
 * Created by amala on 24/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("TixterApp")
        .controller("ProfileController", profileController);

    function profileController($scope, UserService, $location, $rootScope) {
        $scope.error = null;
        $scope.message = null;
        $scope.updateUser = updateUser;

        //if ($rootScope.currentUser) {
            $scope.currentUser = UserService.getCurrentUser();
        //} else {
        //    UserService.getCurrentUser()
        //        .then(function(response) {
        //            $scope.currentUser = response.data;
        //            if (!$scope.currentUser) {
        //                $location.url("/");
        //            }
        //        });
        //}

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

            UserService.updateUser(user._id, user)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        $scope.currentUser = user;
                        console.log($scope.currentUser);
                        UserService.setCurrentUser($scope.currentUser);
                        $scope.message = "User updated successfully";
                    } else {
                        $scope.message = "Unable to update the user";
                    }
                });
        }
    }
})();