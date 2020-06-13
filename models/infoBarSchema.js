const mongoose = require("mongoose");
const { Schema } = mongoose;

const InfoBarSchema = new Schema(
    {
        message1: { type: String},
        message2: { type: String}
    }
);
module.exports = mongoose.model("InfoBar", InfoBarSchema);