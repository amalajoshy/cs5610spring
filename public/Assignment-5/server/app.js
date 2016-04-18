module.exports = function(app, mongoose, db, passport, LocalStrategy) {
    var userModel = require("./models/user.model.server.js") (mongoose, db);
    require("./services/user.service.server.js")(app, userModel, passport, LocalStrategy);

    var formModel = require("./models/form.model.server.js") (mongoose, db);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/field.service.server.js")(app, formModel);
};