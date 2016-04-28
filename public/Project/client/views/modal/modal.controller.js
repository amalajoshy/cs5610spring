/**
 * Created by amala on 10/04/16.
 */
(function () {
    'use strict';

    /*global angular*/
    angular
        .module("TixterApp")
        .controller("ModalController", modalController);

    function modalController($location, $scope, UserService) {
        $scope.$location = $location;
        $scope.login = login;
        $scope.register = register;

        function login (user) {
            if (!user.username) {
                $scope.message = "Please enter Username";
                return;
            }
            if (!user.password) {
                $scope.message = "Please enter a password";
                return;
            }
            UserService.login(user)
                .then(function (response) {
                    console.log(response.data);
                    var user = response.data;
                    if (user) {
                        UserService.setCurrentUser(user);
                        $location.url("/");
                        $("#modal-login").modal("hide");
                    }
                    if(response.error) {
                        $scope.error = "Unable to login";
                    }
                });
        }

        function register (user) {
            $scope.message = null;
            $scope.error = null;

            if (!user) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.firstName) {
                $scope.message = "Please enter your first name";
                return;
            }
            if (!user.lastName) {
                $scope.message = "Please enter your last name";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide an email address";
                return;
            }
            if (!user.password) {
                $scope.message = "Please enter a password";
                return;
            }

            UserService.register(user)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        UserService.setCurrentUser(user);
                        $location.url("/profile");
                        $("#modal-register").modal("hide");
                    } else {
                        $scope.error = "User already exists!";
                    }
                });
        }
    }
}());