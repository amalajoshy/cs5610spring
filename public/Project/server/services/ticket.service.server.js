/**
 * Created by amala on 20/04/16.
 */
module.exports = function (app, TicketModel, EventModel) {
    'use strict';
    /*global angular*/

    app.post("/api/ticket", ensureAuthenticated, createTicket);
    app.get("/api/ticket/:ticketId", ensureAuthenticated, findTicketById);
    app.get("/api/ticket/user/:userId", ensureAuthenticated, findTicketsByUserId);
    app.delete("/api/ticket/:ticketId", isOwner, cancelTicket);

    function ensureAuthenticated(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function isOwner(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(403);
        } else {
            TicketModel.findTicketById(req.params.ticketId)
                .then(function (ticket) {
                    if (ticket && ticket.userId.toString() === req.user._id.toString()) {
                        next();
                    } else {
                        res.send(403);
                    }
                });
        }
    }

    function createTicket(req, res) {
        var userId = req.user._id;
        var ticket = req.body;
        EventModel.reserveCapacityForEvent(ticket.eventId, ticket.quantity)
            .then(function (event) {
                if (event) {
                    TicketModel.createTicket(userId, ticket)
                        .then(
                            function (updatedTicket) {
                                res.json(updatedTicket);
                            },
                            function (err) {
                                if (err) {
                                    EventModel.releaseCapacityForEvent(ticket.eventId, ticket.quantity)
                                        .then(function (event) {
                                            res.json(null);
                                        });
                                }
                            }
                        );
                } else {
                    res.json(null);
                }
            });
    }

    function findTicketById(req, res){
        var ticketId = req.params.ticketId;
        TicketModel
            .findTicketById(ticketId)
            .then(function(ticket){
                res.json(ticket);
            });
    }

    function findTicketsByUserId(req, res) {
        var userId = req.params.userId;
        TicketModel
            .findTicketsByUserId(userId)
            .then(function (tickets) {
                res.json(tickets);
            });
    }

    function cancelTicket(req, res) {
        var ticketId = req.params.ticketId;
        TicketModel.findTicketById(ticketId)
            .then(function (ticket) {
                if (ticket) {
                    TicketModel
                        .cancelTicket(ticketId, req.user._id)
                        .then(function (tickets) {
                            EventModel.releaseCapacityForEvent(ticket.eventId, ticket.quantity)
                                .then(function (event) {
                                    res.json(tickets);
                                });
                        });
                }
            });
    }
};

