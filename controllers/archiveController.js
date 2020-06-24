const createError = require("http-errors");
const Archive = require("../models/archiveSchema");

exports.getArchive = async (req, res, next) => {
    try {
        const archive = await Archive.find()
        res.json({ success: true, archive: archive });
    }
    catch (err) {
        next(err)
    }
};

exports.getArchiveById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const archive = await Archive.findById(id);
        if (!archive) throw createError(404);
        res.json({ success: true, archive: archive });
    }
    catch (err) {
        next(err)
    }
};

exports.postArchive = async (req, res, next) => {
    try {
        const archive = new Archive(req.body);
        await archive.save()
        res.json({ success: true, archive: archive });
    }
    catch (err) {
        next(err)
    }
};

exports.putArchive = async (req, res, next) => {
    const { id } = req.params;
    const archive = req.body;
    try {
        const updateArchive = await Archive.findByIdAndUpdate(id, archive, { new: true });
        if (!updateArchive) throw createError(500);
        res.json({ success: true, archive: updateArchive });
    }
    catch (err) {
        next(err)
    }
};

exports.deleteArchive = async (req, res, next) => {
    const { id } = req.params;
    try {
        const archive = await Archive.findByIdAndDelete(id);
        if (!archive) throw createError(404)
        res.json({ success: true, archive: archive })
    }
    catch (err) {
        next(err)
    }
};