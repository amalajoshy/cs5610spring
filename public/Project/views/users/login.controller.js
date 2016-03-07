/**
 * Created by amala on 24/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("TixterApp")
        .controller("LoginController", loginController);

    function loginController($scope, UserService, $location, $rootScope) {
        $scope.login = login;

        function login (user) {
            var user = UserService.findUserByCredentials(user.username, user.password, $.noop);
            if (user) {
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }
        }
    }
})();