/**
 * Created by amala on 17/02/16.
 */
(function () {
    'use strict';
    (function () {
        /*global angular*/
        angular
            .module("FormBuilderApp")
            .config(function ($routeProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "views/home/home.view.html"
                        //controller: "HomeController"
                    })
                    .when("/admin", {
                        templateUrl: "views/admin/admin.view.html",
                        controller: "AdminController"
                    })
                    .when("/forms", {
                        templateUrl: "views/forms/forms.view.html",
                        controller: "FormsController"
                    })
                    .when("/fields", {
                        templateUrl: "views/forms/fields.view.html",
                        controller: "FieldsController"
                    })
                    .when("/login", {
                        templateUrl: "views/users/login.view.html",
                        controller: "LoginController"
                    })
                    .when("/profile", {
                        templateUrl: "views/users/profile.view.html",
                        controller: "ProfileController"
                    })
                    .when("/register", {
                        templateUrl: "views/users/register.view.html",
                        controller: "RegisterController"
                    })
                    .otherwise({
                        redirectTo: "/"
                    });
            });
    }());
}());