/**
 * Created by amala on 24/02/16.
 */
module.exports = function (mongoose, db) {
    "use strict";
    var q = require("q");
    var EventSchema = require('./event.schema.server.js')(mongoose);
    var eventModel = mongoose.model("eventModel", EventSchema);

    var api = {
        createEvent: createEvent,
        deleteEventById: deleteEventById,
        updateEvent: updateEvent,
        findAllEvents: findAllEvents,
        findEventById: findEventById,
        findEventsByOrganiserId: findEventsByOrganiserId,
        findEventsByCategory: findEventsByCategory
    };
    return api;


    function findEventById(id) {

        var deferred = q.defer();
        eventModel.findById(id, function (err, event) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(event);
            }
        });
        return deferred.promise;
    }

    function findEventsByOrganiserId(id) {
        var deferred = q.defer();
        eventModel.find({organiserId: id}, function (err, events) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(events);
            }
        });
        return deferred.promise;
    }


    function findAllEvents() {
        var deferred = q.defer();
        eventModel.find(function (err, events) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(events);
            }
        });
        return deferred.promise;
    }

    function createEvent(organiserId, event) {
        var deferred = q.defer();
        event.organiserId = organiserId;
        eventModel.create(event, function (err, newEvent) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(newEvent);
            }
        });
        return deferred.promise;
    }


    function deleteEventById(eventId) {
        var deferred = q.defer();
        eventModel.findByIdAndRemove(eventId, function (err, event) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                eventModel.find({organiserId: event.organiserId}, function (err, events) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(events);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function findEventsByCategory(category) {
        var deferred = q.defer();
        eventModel.find({category: category}, function (err, events) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(events);
            }
        });
        return deferred.promise;
    }

    function updateEvent(eventId, newEvent) {
        var deferred = q.defer();
        eventModel.findByIdAndUpdate(eventId, {$set: newEvent}, function (err, event) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(event);
            }
        });
        return deferred.promise;
    }

};

