const mongoose = require('mongoose');
const { Schema } = mongoose;

const ScheduleSchema = new Schema({
  host: { type: String },
  show: { type: String, required: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
});
module.exports = mongoose.model('Schedule', ScheduleSchema);
