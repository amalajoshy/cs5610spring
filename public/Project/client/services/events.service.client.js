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
            setCurrentEvent: setCurrentEvent,
            getCurrentEvent: getCurrentEvent,
            findEventsByCategory: findEventsByCategory
        };
        return services;

        function setCurrentEvent(event) {
            $rootScope.currentEvent = event;
        }

        function getCurrentEvent() {
            return $rootScope.currentEvent;
        }

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
            return $http.get("/api/organiser/" + userId + "/event");
        }

        function findEventsByCategory(category) {
            return $http.get("/api/category/" + category + "/event");
        }

        function deleteEvent(eventId) {
            return $http.delete("/api/event/" + eventId);
        }

        function updateEvent(eventId, newEvent) {
            return $http.put("/api/event/" + eventId, newEvent);
        }
    }
})();

