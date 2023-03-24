const createError = require('http-errors');
const Schedule = require('../models/scheduleSchema');

exports.getSchedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.find();
    res.json({ success: true, schedule: schedule });
  } catch (err) {
    next(err);
  }
};

exports.getScheduleById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const schedule = await Schedule.findById(id);
    if (!schedule) throw createError(404);
    res.json({ success: true, schedule: schedule });
  } catch (err) {
    next(err);
  }
};

exports.postSchedule = async (req, res, next) => {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.json({ success: true, schedule: schedule });
  } catch (err) {
    next(err);
  }
};

exports.putSchedule = async (req, res, next) => {
  const { id } = req.params;
  const schedule = req.body;
  try {
    const updateSchedule = await Schedule.findByIdAndUpdate(id, schedule, {
      new: true,
    });
    if (!updateSchedule) throw createError(500);
    res.json({ success: true, schedule: updateSchedule });
  } catch (err) {
    next(err);
  }
};

exports.deleteSchedule = async (req, res, next) => {
  const { id } = req.params;
  try {
    const schedule = await Schedule.findByIdAndDelete(id);
    if (!schedule) throw createError(404);
    res.json({ success: true, schedule: schedule });
  } catch (err) {
    next(err);
  }
};
