/**
 * Created by amala on 17/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("TixterApp", ["ngRoute"])
        .run(function ($rootScope, UserService, $http) {
            loadUserProfile()
                .then(function(response) {
                    UserService.setCurrentUser(response.data);
                });

            function loadUserProfile() {
                return $http.post("/api/isloggedin");
            }
        });
}());