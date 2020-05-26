const mongoose = require("mongoose");
const { Schema } = mongoose;

const MusicSchema = new Schema(
    {
        host: { type: String, required: true },
        show: { type: String, required: true },
        genre: { type: String, required: true },
        date: { type: Date, default: Date.now, required: true },
        link: { type: String, required: true },
    }
);
module.exports = mongoose.model("Music", MusicSchema);