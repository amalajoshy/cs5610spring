/**
 * Created by amala on 24/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, UserService, $location, $rootScope) {
        $scope.login = login;

        function login (user) {
            UserService.findUserByCredentials(user.username, user.password)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        UserService.setCurrentUser(user);
                        $location.url("/profile");
                    }
                });
        }
    }
})();