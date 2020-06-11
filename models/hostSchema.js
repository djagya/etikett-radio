const mongoose = require("mongoose");
const { Schema } = mongoose;

const HostSchema = new Schema(
    {
        hostName: { type: String, required: true },
        description: {type:String, required: true},
        youtube: { type: String},
        soundcloud: { type: String},
        mixcloud: { type: String},
        facebook: { type: String},
        instagram: { type: String},
        twitter: { type: String},
        snapchat: { type: String},
        other: { type: String},
    }
);
module.exports = mongoose.model("Host", HostSchema);