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

        function login(user)
        {
            $scope.error = null;
            UserService
                .login(user)
                .then(function(response) {
                        console.log("Login succeeded");
                        UserService.setCurrentUser(response.data);
                        //$rootScope.danger = null;
                        $location.url("/profile");
                    },
                    function(error) {
                        console.log("Login failed");
                        $scope.error = "Unable to login";
                    }
                );
        }
    }
})();