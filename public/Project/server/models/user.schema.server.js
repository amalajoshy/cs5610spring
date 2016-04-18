/**
 * Created by amala on 30/03/16.
 */
module.exports = function (mongoose) {
    var UserSchema = mongoose.Schema({
        "username" : String,
        "password": String,
        "firstName" : String,
        "lastName" : String,
        "phone" : String
    }, {collection: "tixter.users"});

    return UserSchema;
};