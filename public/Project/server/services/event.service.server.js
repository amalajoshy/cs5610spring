module.exports = function (app, model, multer) {
    "use strict";

    var eventsImageDir = __dirname + "/../uploads/events";
    var eventImageUpload = multer({dest: eventsImageDir});

    // get all events by userId
    app.get("/api/organiser/:organiserId/event", findEventsByOrganiserId);
    // get event by id
    app.get("/api/event/:eventId", findEventById);
    app.get("/api/event", findAllEvents);
    app.get("/api/category/:category/event", findEventsByCategory);
    // create event
    app.post("/api/event", ensureAuthenticated, createEvent);
    // update event
    app.put("/api/event/:eventId", updateEvent);
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

    function uploadImage (req, res, next) {
        console.log(req.file);
        res.send("Success");
    }

    function findAllEvents (req, res) {
        model
            .findAllEvents()
            .then(function (events) {
                res.json(events);
            });
    }

    function findEventsByOrganiserId (req, res) {
        var organiserId = req.params.organiserId;
        model
            .findEventsByOrganiserId(organiserId)
            .then(function(events){
                res.json(events);
            });
    }

    function findEventsByCategory (req, res) {
        var category = req.params.category;
        model
            .findEventsByCategory(category)
            .then(function(events){
                res.json(events);
            });
    }

    function findEventById(req, res){
        var eventId = req.params.eventId;
        model
            .findEventById(eventId)
            .then(function(event){
                res.json(event);
            });
    }


    function createEvent (req, res) {
        var organiserId = req.user._id;
        var event = req.body;
        model
            .createEvent(organiserId, event)
            .then(function (events) {
                res.json(events);
            });
    }

    function updateEvent (req, res) {
        var eventId = req.params.eventId;
        var newEvent = req.body;
        model
            .updateEvent(eventId, newEvent)
            .then(function (event) {
                res.json(event);
            });
    }

    function deleteEvent (req, res) {
        var eventId = req.params.eventId;
        model
            .deleteEventById(eventId)
            .then(function (events) {
                res.json(events);
            });

    }
};