/**
 * Created by amala on 24/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("TixterApp")
        .factory("EventService", EventService);

    function EventService($http, $rootScope) {
        var services = {
            createEvent: createEvent,
            findEventsByOrganiserId: findEventsByOrganiserId,
            deleteEvent: deleteEvent,
            updateEvent: updateEvent,
            findAllEvents: findAllEvents,
            findEventById: findEventById,
            findEventsByCategory: findEventsByCategory
        };
        return services;

        function findEventById(eventId) {
            return $http.get("/api/event/" + eventId);
        }

        function findAllEvents() {
            return $http.get("/api/event");
        }

        function createEvent(event) {
            return $http.post("/api/event", event);
        }

        function findEventsByOrganiserId(userId) {
            return $http.get("/api/event/organiser/" + userId);
        }

        function findEventsByCategory(category) {
            return $http.get("/api/event/category/" + category);
        }

        function deleteEvent(eventId) {
            return $http.delete("/api/event/" + eventId);
        }

        function updateEvent(eventId, newEvent) {
            return $http.put("/api/event/" + eventId, newEvent);
        }
    }
})();

