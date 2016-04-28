module.exports = function (app, EventModel, TicketModel, multer) {
    "use strict";

    var eventsImageDir = __dirname + "/../uploads/events";
    var eventImageUpload = multer({dest: eventsImageDir});

    // get all events by userId
    app.get("/api/event/organiser/:organiserId", findEventsByOrganiserId);
    // get event by id
    app.get("/api/event/:eventId", findEventById);
    app.get("/api/event", findAllEvents);
    app.get("/api/event/category/:category", findEventsByCategory);
    // create event
    app.post("/api/event", ensureAuthenticated, createEvent);
    // update event
    app.put("/api/event/:eventId", isOrganiser, updateEvent);
    // delete event
    app.delete("/api/event/:eventId", deleteEvent);

    app.post('/api/event/:eventId/image', eventImageUpload.single('event-image'), uploadImage);

    function ensureAuthenticated(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function isOrganiser(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(403);
        } else {
            EventModel.findEventById(req.params.eventId)
                .then(function (event) {
                        if (event && event.organiserId.toString() === req.user._id.toString()) {
                            next();
                        } else {
                            res.send(403);
                        }
                });
        }
    }

    function uploadImage (req, res, next) {
        var eventId = req.params.eventId;
        EventModel
            .setEventImageUrl(eventId, req.file.filename)
            .then(function(imageFileName){
                res.json(imageFileName);
            });
    }

    function findAllEvents (req, res) {
        EventModel
            .findAllEvents()
            .then(function (events) {
                res.json(events);
            });
    }

    function findEventsByOrganiserId (req, res) {
        var organiserId = req.params.organiserId;
        EventModel
            .findEventsByOrganiserId(organiserId)
            .then(function(events){
                res.json(events);
            });
    }

    function findEventsByCategory (req, res) {
        var category = req.params.category;
        EventModel
            .findEventsByCategory(category)
            .then(function(events){
                res.json(events);
            });
    }

    function findEventById(req, res){
        var eventId = req.params.eventId;
        EventModel
            .findEventById(eventId)
            .then(function(event){
                res.json(event);
            });
    }


    function createEvent (req, res) {
        var organiserId = req.user._id;
        var event = req.body;
        EventModel
            .createEvent(organiserId, event)
            .then(function (events) {
                res.json(events);
            });
    }

    function updateEvent (req, res) {
        var eventId = req.params.eventId;
        var newEvent = req.body;
        EventModel
            .updateEvent(eventId, newEvent)
            .then(function (event) {
                res.json(event);
            });
    }

    function deleteEvent (req, res) {
        var eventId = req.params.eventId;
        EventModel
            .deleteEventById(eventId)
            .then(function (events) {
                if (events) {
                    TicketModel.findTicketsByEventId(eventId)
                        .then(function (tickets) {
                            if (tickets) {
                                TicketModel.deleteTickets(tickets);
                            }
                        });
                }
                res.json(events);
            });

    }
};