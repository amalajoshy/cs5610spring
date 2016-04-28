/**
 * Created by amala on 06/03/16.
 */

(function () {
    'use strict';
    /*global angular*/
    angular
        .module("TixterApp")
        .factory("TicketService", TicketService);

    function TicketService($http) {
        var services = {
            createTicket: createTicket,
            findTicketById: findTicketById,
            findTicketsByUserId: findTicketsByUserId,
            cancelTicket: cancelTicket
        };
        return services;

        function createTicket(ticket) {
            return $http.post("/api/ticket", ticket);
        }

        function findTicketById(ticketId) {
            return $http.get("/api/ticket/" + ticketId);
        }

        function findTicketsByUserId(userId) {
            return $http.get("/api/ticket/user/" + userId);
        }

        function cancelTicket(ticketId) {
            return $http.delete("/api/ticket/" + ticketId);
        }
    }
})();

