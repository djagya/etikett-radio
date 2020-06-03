const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogSchema = new Schema(
    {
        heading: { type: String, required: true },
        date: { type: Date, default: Date.now, required: true },
        text: { type: String, required: true }
    }
);
module.exports = mongoose.model("Blog", BlogSchema);