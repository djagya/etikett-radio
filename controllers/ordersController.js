const createError = require("http-errors");
const Order = require("../models/ordersSchema");

exports.getOrders = async (req, res, next) => {
    try {
        const music = await Order.find().populate("item", "-__v -id");
        res.json({ success: true, orders: music });
    }
    catch (err) {
        next(err)
    }
};

exports.getOrderById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const music = await Order.findById(id).populate("item", "-__v -id");
        if (!music) throw createError(404);
        res.json({ success: true, order: music });
    }
    catch (err) {
        next(err)
    }
};

exports.postOrders = async (req, res, next) => {
    try {
        const order = new Order(req.body);
        await order.save()
        res.json({ success: true, order: order });
    }
    catch (err) {
        next(err)
    }
};
exports.putOrders = async (req, res, next) => {
    const { id } = req.params;
    const music = req.body;
    try {
        const updateOrder = await Order.findByIdAndUpdate(id, music, { new: true });
        if (!updateOrder) throw createError(500);
        res.json({ success: true, music: updateOrder });
    }
    catch (err) {
        next(err)
    }
};
exports.deleteOrders = async (req, res, next) => {
    const { id } = req.params;
    try {
        const music = await Order.findByIdAndDelete(id);
        if (!music) throw createError(404)
        res.json({ success: true, music: music })
    }
    catch (err) {
        next(err)
    }
};