/**
 * Created by amala on 24/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($location, $scope, UserService, $rootScope) {
        $scope.register = register;

        function register(user) {
            $scope.message = null;
            if (user == null) {
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
            var ex_user = UserService.findUserByCredentials(user.username, user.password, $.noop);
            if (ex_user !== null) {
                $scope.message = "User already exists";
                return;
            }
            var newUser = UserService.createUser($scope.user, $.noop);
            UserService.setCurrentUser(newUser);
            $location.url("/profile");
        }
    }
})();