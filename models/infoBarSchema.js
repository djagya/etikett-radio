const mongoose = require("mongoose");
const { Schema } = mongoose;

const InfoBarSchema = new Schema(
    {
        message: { type: String}
    }
);
module.exports = mongoose.model("InfoBar", InfoBarSchema);