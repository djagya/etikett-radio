const createError = require('http-errors');
const InfoBar = require('../models/infoBarSchema');

exports.getInfoBar = async (req, res, next) => {
  try {
    const infoBar = await InfoBar.find();
    res.json({ success: true, infoBar: infoBar });
  } catch (err) {
    next(err);
  }
};

exports.getInfoBarById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const infoBar = await InfoBar.findById(id);
    if (!infoBar) throw createError(404);
    res.json({ success: true, infoBar: infoBar });
  } catch (err) {
    next(err);
  }
};

exports.postInfoBar = async (req, res, next) => {
  try {
    const infoBar = new InfoBar(req.body);
    await infoBar.save();
    res.json({ success: true, infoBar: infoBar });
  } catch (err) {
    next(err);
  }
};

exports.putInfoBar = async (req, res, next) => {
  const { id } = req.params;
  const infoBar = req.body;
  try {
    const updateInfoBar = await InfoBar.findByIdAndUpdate(id, infoBar, {
      new: true,
    });
    if (!updateInfoBar) throw createError(500);
    res.json({ success: true, infoBar: updateInfoBar });
  } catch (err) {
    next(err);
  }
};

exports.deleteInfoBar = async (req, res, next) => {
  const { id } = req.params;
  try {
    const infoBar = await InfoBar.findByIdAndDelete(id);
    if (!infoBar) throw createError(404);
    res.json({ success: true, infoBar: infoBar });
  } catch (err) {
    next(err);
  }
};
