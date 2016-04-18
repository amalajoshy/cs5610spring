/**
 * Created by amala on 24/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($location, $scope, UserService) {
        $scope.$location = $location;
        $scope.register = register;


        function register(user) {
            $scope.message = null;
            $scope.error = null;

            if (!user) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please enter password twice";
                return;
            }
            if (user.password !== user.password2) {
                $scope.message = "Passwords must match";
                return;
            }
            if (!user.email) {
                $scope.message = "Please provide a valid email address";
                return;
            } else {
                user.emails = [user.email];
            }
            if (!user.role) {
                $scope.message = "Please select a role ";
                return;
            } else {
                user.roles = [user.role];
                //user.role
            }

            UserService.register(user)
                .then(function (response) {
                    var currentUser = response.data;
                    if (currentUser) {
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile");
                    } else {
                        $scope.error = "User already exists!";
                    }
                });
        }
    }
})();