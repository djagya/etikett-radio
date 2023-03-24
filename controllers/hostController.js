const createError = require('http-errors');
const Host = require('../models/hostSchema');

exports.getHost = async (req, res, next) => {
  try {
    const host = await Host.find();
    res.json({ success: true, host: host });
  } catch (err) {
    next(err);
  }
};

exports.getHostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const host = await Host.findById(id);
    if (!host) throw createError(404);
    res.json({ success: true, host: host });
  } catch (err) {
    next(err);
  }
};

exports.postHost = async (req, res, next) => {
  try {
    const host = new Host(req.body);
    await host.save();
    res.json({ success: true, host: host });
  } catch (err) {
    next(err);
  }
};

exports.putHost = async (req, res, next) => {
  const { id } = req.params;
  const host = req.body;
  try {
    const updateHost = await Host.findByIdAndUpdate(id, host, { new: true });
    if (!updateHost) throw createError(500);
    res.json({ success: true, host: updateHost });
  } catch (err) {
    next(err);
  }
};

exports.deleteHost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const host = await Host.findByIdAndDelete(id);
    if (!host) throw createError(404);
    res.json({ success: true, host: host });
  } catch (err) {
    next(err);
  }
};
