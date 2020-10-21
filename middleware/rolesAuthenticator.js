const createError = require("http-errors");

exports.isAdmin = (req, res, next) => {

    const { role } = req.user;
    if (role !== "Admin") next(createError(403));
    next();
}

exports.isHostAdmin = (req, res, next) => {
    const { role } = req.user;
    if (role !== "Host" && role !=="Admin") next(createError(403));
    next();
}