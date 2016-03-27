module.exports = function(app) {
    var userModel = require("./models/user.model.server.js") (app);
    require("./services/user.service.server.js")(app, userModel);

    var formModel = require("./models/form.model.server.js") (app);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/field.service.server.js")(app, formModel);
};