module.exports = function (mongoose) {
    var FieldSchema = require("./field.schema.server.js")(mongoose);

    var FormSchema = mongoose.Schema({
        "title": String,
        "userId": String,
        "fields": [FieldSchema],
        "created": {type: Date, default: Date.now()},
        "updated": {type: Date, default: Date.now()}
    }, { collection: "cs5610.form" });

    return FormSchema;
};