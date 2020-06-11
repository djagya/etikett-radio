const mongoose = require("mongoose");
const { Schema } = mongoose;

const HostSchema = new Schema(
    {
        userID: {type: String, required: true}, //for validation if user = host page user
        hostName: { type: String, required: true },
        hostImg: { type: String, required: true },
        description: {type:String, required: true},
        youtube: { type: String},
        soundcloud: { type: String},
        mixcloud: { type: String},
        facebook: { type: String},
        instagram: { type: String},
        twitter: { type: String},
        snapchat: { type: String},
        otherName: { type: String},
        otherLink: { type: String}
    }
);
module.exports = mongoose.model("Host", HostSchema);