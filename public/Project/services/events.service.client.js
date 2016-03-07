/**
 * Created by amala on 24/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("TixterApp")
        .factory("EventService", EventService);

    function EventService($rootScope) {
        var services = {
            events : [{"_id": "000", "title": "Cooking", "place_id": "ChIJd8BlQ2BZwokRAFUEcm_qrcA", "location": "Seattle", "time_date": "9 pm 10th Sept 2016", "user_id": 123, "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua."},
                    {"_id": "010", "title": "ABC Conference", "place_id": "ChIJd8BlQ2BZwokRAFUEcm_qrcA", "location": "California", "time_date": "9 pm 10th Sept 2016", "user_id": 123, "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua."},
                    {"_id": "020", "title": "Career Launch", "place_id": "ChIJd8BlQ2BZwokRAFUEcm_qrcA", "location": "Boston", "time_date": "9 pm 10th Sept 2016", "userId": 234, "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua."}],
            createEventForUser: createEventForUser,
            findAllEventsForUser: findAllEventsForUser,
            deleteEventById: deleteEventById,
            updateEventById: updateEventById,
            getAllEvents: getAllEvents,
            getEventId: getEventId,
            setCurrentEvent: setCurrentEvent,
            getCurrentEvent: getCurrentEvent
        };
        return services;

        function setCurrentEvent(event) {
            $rootScope.currentEvent = event;
        }

        function getCurrentEvent() {
            return $rootScope.currentEvent;
        }

        function getEventId(event) {
            for (var u in services.events) {
                if (services.events[u]._id === event._id) {
                    return services.events[u]._id;
                }
            }
        }
        function getAllEvents() {
            return services.events;
        }
        function createEventForUser(userId, event, callback) {
            var new_event = {
                _id: (new Date()).getTime(),
                title: event.title,
                place_id: event.place_id,
                location: event.location,
                time_date : event.time_date,
                user_id: userId
            };
            services.events.push(new_event);
            callback(new_event);
            return new_event;

        }
        function findAllEventsForUser(userId, callback) {
            var userevents = [];
            for (var u in services.events) {
                if (services.events[u].user_id === userId) {
                    userevents.push(services.events[u]);
                }
            }
            callback(userevents);
            return userevents;

        }
        function deleteEventById(eventId, callback){
            for (var u in services.events) {
                if (services.events[u]._id === eventId) {
                    services.events.splice(u, 1);
                }
            }
            callback(service.events);
            return service.events;
        }
        function updateEventById(eventId, newEvent, callback){
            for (var u in services.events) {
                if (services.events[u]._id === eventId) {
                    services.events[u].title = newEvent.title;
                    services.events[u].location = newEvent.location;
                    services.events[u].place_id = newEvent.place_id;
                    services.events[u].time_date = newEvent.time_date;
                    services.events[u].userId = newEvent.userId;
                    callback(services.events[u]);
                    return services.events[u];
                }
            }
            callback(null);
            return null;
        }
    }
})();

