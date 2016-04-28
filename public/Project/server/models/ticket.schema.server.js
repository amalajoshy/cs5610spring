/**
 * Created by amala on 20/04/16.
 */
module.exports = function (mongoose) {
    var Schema = mongoose.Schema;
    var TicketSchema = Schema({
        userId: {type: Schema.Types.ObjectId, required: true},
        eventId: {type: Schema.Types.ObjectId, required: true},
        quantity : {type: Number, default: 1, min: 1},
        price: {type: Number, default: 0, min: 0},
        status: {type: String, default: "active"},
        qrCodeImgTag: String
    }, {collection: "tixter.tickets"});

    return TicketSchema;
};