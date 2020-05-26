const createError = require("http-errors");
const User = require("../models/usersSchema");
const { encrypt } = require("../lib/encrypt");

exports.getUser = async (req, res, next) => {
    try {
        const users = await User.find()
        res.json({ success: true, users: users });
    }
    catch (err) {
        next(err)
    }
};

exports.getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const users = await User.findById(id);
        if (!user) throw createError(404);
        res.json({ success: true, users: users });
    }
    catch (err) {
        next(err)
    }
};

exports.postUser = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const token = user.generateAuthToken();
        await user.save();
        const publicData = user.getPublicFields();
        res.header("x-auth", token).json({ success: true, user: publicData });
    }
    catch (err) {
        next(err)
    }
};
exports.login = async (req, res, next) => {
    const { email, pw } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) throw createError(404)
        const isValid = await user.checkPW(pw);
        if (!isValid) throw createError(403);
        const token = user.generateAuthToken();
        const publicData = user.getPublicFields();

        res.header("x-auth", token).json({ success: true, user: publicData });
    } catch (err) {
        next(err)
    }
};
exports.putUser = async (req, res, next) => {
    const { id } = req.params;
    const user = req.body;
    try {
        const updatedPW = await encrypt(user.pw);
        user.pw = updatedPW;
        const updateUser = await User.findByIdAndUpdate(id, user, { new: true });
        if (!updateUser) throw createError(500);
        res.json({ success: true, user: updateUser });
    }
    catch (err) {
        next(err)
    }
};

exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) throw createError(404)
        res.json({ success: true, user: user })
    }
    catch (err) {
        next(err)
    }
};