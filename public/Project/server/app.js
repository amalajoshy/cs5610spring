module.exports = function(app, mongoose, db, passport, LocalStrategy, multer) {//} userImageUpload, eventImageUpload) {
    var UserModel = require("./models/user.model.server.js") (mongoose, db);
    require("./services/user.service.server.js")(app, UserModel, passport, LocalStrategy);

    var EventModel = require("./models/event.model.server.js") (mongoose, db);
    require("./services/event.service.server.js")(app, EventModel, multer);
    //require("./services/field.service.server.js")(app, formModel);
};