const mongoose = require("mongoose");
const { Schema } = mongoose;

const ArchiveSchema = new Schema(
    {
        host: { type: String, required: true },
        show: { type: String, required: true },
        genre: { type: String, required: true },
        date: { type: Date, default: Date.now, required: true },
        link: { type: String, required: true },
        description: {type: String, default:"N/A"}
    }
);
module.exports = mongoose.model("Archive", ArchiveSchema);