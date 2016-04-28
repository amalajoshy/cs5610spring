/**
 * Created by amala on 31/03/16.
 */
module.exports = function (mongoose) {
    var Schema = mongoose.Schema;
    var EventSchema = Schema({
        title: {type: String, required: true},
        location: String,
        startTime: Date,
        endTime: Date,
        placeId: String,
        organiserId: {type: Schema.Types.ObjectId, required: true},
        description: String,
        totalCapacity: {type: Number, min: 0},
        availableCapacity: {type: Number, min: 0},
        filledCapacity: {type: Number, default: 0, min: 0},
        volunteerCapacity: {type: Number, min: 0, default: 0},
        ticketPrice: {type: Number, default: 0, min: 0, max: 0},
        url: String,
        category: String,
        image: String
    }, {collection: "tixter.events"});

    return EventSchema;
};