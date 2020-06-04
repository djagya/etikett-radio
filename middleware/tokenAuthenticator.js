const User = require("../models/usersSchema");
const createError = require("http-errors");

const auth = async (req, res, next) => {
    const token = req.cookies["x-auth"];

    try {
        const user = await User.findByToken(token);
        if (!user) throw createError(403);
        req.user = user;
        req.token = token;
        console.log(user)
        next();
    }
    catch (err) {
        next(err);
    }
}

module.exports = auth;