/**
 * Created by amala on 06/03/16.
 */
(function () {
    'use strict';

    /*global angular*/
    angular
        .module("TixterApp")
        .controller("TicketController", ticketController);

    function ticketController($scope, $location, TicketService, $rootScope) {
        var userId = $rootScope.currentUser._id;
        $scope.tickets = TicketService.findAllTicketsForUser(userId, $.noop);
    }
}());
