/**
 * Created by amala on 17/02/16.
 */
(function () {
    'use strict';
    (function () {
        /*global angular*/
        angular
            .module("TixterApp")
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
                    .when("/events", {
                        templateUrl: "views/events/events.view.html",
                        controller: "EventsController"
                    })
                    .when("/tickets", {
                        templateUrl: "views/events/tickets.view.html",
                        controller: "TicketController"
                    })
                    .when("/selectedEvent", {
                        templateUrl: "views/events/selectedEvent.view.html",
                        controller: "SelectedEventController"
                    })
                    .when("/browseEvents", {
                        templateUrl: "views/events/browseEvents.view.html",
                        controller: "BrowseEventsController"
                    })
                    .when("/fields", {
                        templateUrl: "views/events/fields.view.html",
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