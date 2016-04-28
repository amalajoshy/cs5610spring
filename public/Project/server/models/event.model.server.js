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
        findEventsByCategory: findEventsByCategory,
        setEventImageUrl: setEventImageUrl,
        reserveCapacityForEvent: reserveCapacityForEvent,
        releaseCapacityForEvent: releaseCapacityForEvent
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
        event.availableCapacity = event.totalCapacity;
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
        delete newEvent._id;
        delete newEvent.filledCapacity;
        eventModel.findByIdAndUpdate(eventId, {$set: newEvent}, {new: true}, function (err, event) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                event.availableCapacity = event.totalCapacity - event.filledCapacity;
                event.save(function (err, updatedEvent) {
                    if (err) {
                        console.log(err);
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedEvent);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function setEventImageUrl(eventId, filename) {
        var deferred = q.defer();
        eventModel.findByIdAndUpdate(eventId, {$set: {image: filename}}, {new: true}, function(err, event) {
           if (err) {
               console.log(err);
               deferred.reject(err);
           } else {
               deferred.resolve(event);
           }
        });
        return deferred.promise;
    }

    function reserveCapacityForEvent(eventId, requiredCapacity) {
        var deferred = q.defer();
        eventModel.findOneAndUpdate({_id: eventId, availableCapacity: {$gte: requiredCapacity}},
            {$inc: {availableCapacity: -(requiredCapacity), filledCapacity: requiredCapacity}}, {new: true}, function (err, event) {
                if (err) {
                    console.log(err);
                    deferred.reject(err);
                } else {
                    deferred.resolve(event);
                }
        });
        return deferred.promise;
    }

    function releaseCapacityForEvent(eventId, releasedCapacity) {
        var deferred = q.defer();
        eventModel.findByIdAndUpdate(eventId, {$inc: {availableCapacity: releasedCapacity, filledCapacity: -(releasedCapacity)}},
            {new: true}, function (err, event) {
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

