module.exports = function(app, mongoose, db, passport, LocalStrategy, multer) {
    var UserModel = require("./models/user.model.server.js") (mongoose, db);
    require("./services/user.service.server.js") (app, UserModel, passport, LocalStrategy);

    var EventModel = require("./models/event.model.server.js") (mongoose, db);
    var TicketModel = require("./models/ticket.model.server.js") (mongoose, db);

    require("./services/event.service.server.js") (app, EventModel, TicketModel, multer);
    require("./services/ticket.service.server.js") (app, TicketModel, EventModel);
};