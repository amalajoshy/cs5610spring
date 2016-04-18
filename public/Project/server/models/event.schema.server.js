/**
 * Created by amala on 31/03/16.
 */
module.exports = function (mongoose) {
    var EventSchema = mongoose.Schema({
        "title": {type: String, required: true},
        "location": {type: String, required: true},
        "startTime": Date,
        "endTime": Date,
        "placeId": {type: String, required: true},
        "organiserId": {type: String, required: true},
        "description": {type: String, required: true},
        "capacity": {type: Number, min: 0, default: 0, required: true},
        "volunteerCapacity": {type: Number, min: 0, default: 0},
        "url": String,
        "category": {type: String, required: true},
        "image": String
    }, {collection: "tixter.events"});

    return EventSchema;
};