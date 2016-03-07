/**
 * Created by amala on 06/03/16.
 */
/**
 * Created by amala on 24/02/16.
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module("TixterApp")
        .factory("TicketService", TicketService);

    function TicketService($rootScope) {
        var services = {
            tickets : [{"ticket_id": "1234", "event_id": "000", "user_id": 123},
                {"ticket_id": "1235", "event_id": "000", "user_id": 123},
                {"ticket_id": "1236", "event_id": "010", "userId": 234}],
            createTicketForUser: createTicketForUser,
            findAllTicketsForUser: findAllTicketsForUser,
            CancelTicketById: CancelTicketById,
            getAllTickets: getAllTickets
        };
        return services;

        
        function getAllTickets() {
            return services.tickets;
        }
        function createTicketForUser(userId, event, callback) {
            var new_ticket = {
                ticket_id: (new Date()).getTime(),
                event_id: event._id,
                user_id: userId
            };
            services.tickets.push(new_ticket);
            callback(new_ticket);
            return new_ticket;

        }
        function findAllTicketsForUser(userId, callback) {
            var usertickets = [];
            for (var u in services.tickets) {
                if (services.tickets[u].user_id === userId) {
                    usertickets.push(services.tickets[u]);
                }
            }
            callback(usertickets);
            return usertickets;

        }
        function CancelTicketById(eventId, callback){
            for (var u in services.tickets) {
                if (services.tickets[u]._id === eventId) {
                    services.tickets.splice(u, 1);
                }
            }
            callback(service.tickets);
            return service.tickets;
        }
    }
})();

