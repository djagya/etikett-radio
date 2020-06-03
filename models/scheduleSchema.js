const mongoose = require("mongoose");
const { Schema } = mongoose;

const ScheduleSchema = new Schema(
    {
        host: { type: String, required: true },
        show: { type: String, required: true },
        genre: { type: String, required: true },
        datefrom: { type: Date, default: Date.now, required: true },
        dateto: { type: Date, default: Date.now, required: true },
    }
);
module.exports = mongoose.model("Schedule", ScheduleSchema);