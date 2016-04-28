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
                    })
                    .when("/admin", {
                        templateUrl: "views/admin/admin.view.html",
                        controller: "AdminController"
                    })
                    .when("/createEvent", {
                        templateUrl: "views/events/createEvent.view.html",
                        controller: "EventsController"
                    })
                    .when("/event/:eventId", {
                        templateUrl: "views/events/selectedEvent.view.html",
                        controller: "SelectedEventController"
                    })
                    .when("/events/browse", {
                        templateUrl: "views/events/browseEvents.view.html",
                        controller: "BrowseEventsController"
                    })
                    .when("/events", {
                        templateUrl: "views/events/myEvents.view.html",
                        controller: "MyEventsController"
                    })
                    .when("/tickets", {
                        templateUrl: "views/tickets/myTickets.view.html",
                        controller: "MyTicketsController"
                    })
                    .when("/ticket/:ticketId", {
                        templateUrl: "views/tickets/ticket.view.html",
                        controller: "TicketController"
                    })
                    .when("/event/:eventId/ticket", {
                        templateUrl: "views/tickets/ticket.view.html",
                        controller: "TicketController"
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