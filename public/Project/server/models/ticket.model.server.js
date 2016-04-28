/**
 * Created by amala on 20/04/16.
 */
module.exports = function (mongoose, db) {
    "use strict";
    var q = require("q");
    var qrCode = require("qrcode-npm");
    var TicketSchema = require('./ticket.schema.server.js')(mongoose);
    var ticketModel = mongoose.model("ticketModel", TicketSchema);

    var api = {
        createTicket: createTicket,
        findTicketById: findTicketById,
        findTicketsByUserId: findTicketsByUserId,
        findTicketsByEventId: findTicketsByEventId,
        cancelTicket: cancelTicket,
        deleteTickets: deleteTickets
    };
    return api;


    function createTicket (userId, ticket) {
        var deferred = q.defer();
        ticket.userId = userId;
        ticketModel.create(ticket, function (err, newTicket) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                var qr = qrCode.qrcode(4, 'M');
                qr.addData(newTicket._id.toString());
                qr.make();
                newTicket.qrCodeImgTag = qr.createImgTag(4);
                newTicket.save(function (err, updatedTicket) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedTicket);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function findTicketById(id) {
        var deferred = q.defer();
        ticketModel.findById(id, function (err, ticket) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(ticket);
            }
        });
        return deferred.promise;
    }

    function findTicketsByUserId(userId) {
        var deferred = q.defer();
        ticketModel.find({userId: userId}, function (err, tickets) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(tickets);
            }
        });
        return deferred.promise;
    }

    function findTicketsByEventId(eventId) {
        var deferred = q.defer();
        ticketModel.find({eventId: eventId}, function (err, tickets) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(tickets);
            }
        });
        return deferred.promise;
    }

    function cancelTicket(ticketId) {
        var deferred = q.defer();
        ticketModel.findByIdAndRemove(ticketId, function (err, ticket) {
            if (err) {
                deferred.reject(err);
            } else {
                ticketModel.find({userId: ticket.userId}, function (err, tickets) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(tickets);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function deleteTickets(tickets) {
        var deferred = q.defer();
        for (var i in tickets) {
            ticketModel.remove({_id: tickets[i]._id}, function(err) {
                if (err) {
                    console.log(err);
                    deferred.reject(err);
                } else {
                    if (i + 1 == tickets.length) {
                        deferred.resolve(tickets);
                    }
                }
            });
        }
        return deferred.promise;
    }
};