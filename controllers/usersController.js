const createError = require("http-errors");
const User = require("../models/usersSchema");
const { encrypt } = require("../lib/encrypt");
const nodemailer = require('nodemailer');


exports.getUsers = async (req, res, next) => {
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
        const user = await User.findById(id);
        
        if (!user) throw createError(404);
        res.json({ success: true, user: user });
    }
    catch (err) {
        next(err)
    }
};

exports.postUser = async (req, res, next) => {
    console.log("postUser is running")
    try {
        const user = new User(req.body);
        console.log(user)
        // Capitalize
        user.firstName = user.firstName[0].toLocaleUpperCase() + user.firstName.substring(1).toLocaleLowerCase();
        user.lastName = user.lastName[0].toLocaleUpperCase() + user.lastName.substring(1).toLocaleLowerCase();

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

        res.cookie("x-auth", token).json({ success: true, user: publicData });
    } catch (err) {
        next(err)
    }
};
exports.putUser = async (req, res, next) => {
    const { id } = req.params;
    const user = req.body;
    console.log(id, user)
    try {
        if (user.pw && user.pw.length >= 8) {
            const updatedPW = await encrypt(user.pw);
            user.pw = updatedPW;
        }
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

exports.sendEmail = async (req, res, next) => {
    const {name, email, subject, message} = req.body;
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'etikett.radio.client@gmail.com',
            pass: 'spongebob01'
        }
    });
    const mailOptions = {
        from: email,
        to: 'simonsch.tz@gmail.com',
        subject: subject,
        text: `Name: ${name}\nFrom: ${email}\n \n${message}`
    };
    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) { next(err) }
        else { res.json({success: true, info}) }
    });
}