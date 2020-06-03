const createError = require("http-errors");
const Blog = require("../models/blogSchema");

exports.getBlog = async (req, res, next) => {
    try {
        console.log("getBlog us runnin")
        const blog = await Blog.find()
        res.json({ success: true, blog: blog });
    }
    catch (err) {
        next(err)
    }
};

exports.getBlogById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) throw createError(404);
        res.json({ success: true, blog: blog });
    }
    catch (err) {
        next(err)
    }
};

exports.postBlog = async (req, res, next) => {
    try {
        const blog = new Blog(req.body);
        await blog.save()
        res.json({ success: true, blog: blog });
    }
    catch (err) {
        next(err)
    }
};

exports.putBlog = async (req, res, next) => {
    const { id } = req.params;
    const blog = req.body;
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
        if (!updateBlog) throw createError(500);
        res.json({ success: true, blog: updateBlog });
    }
    catch (err) {
        next(err)
    }
};

exports.deleteBlog = async (req, res, next) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) throw createError(404)
        res.json({ success: true, blog: blog })
    }
    catch (err) {
        next(err)
    }
};