const Route = require("express").Router();
const { getBlogById, getBlog, postBlog, putBlog, deleteBlog } = require("../controllers/blogController");
const auth = require("../middleware/tokenAuthenticator");
const isAdmin = require("../middleware/rolesAuthenticator");

Route.get("/", auth, getBlog);
Route.post("/post", auth, isAdmin, postBlog); //isAdmin
//Alternative syntax for practice purposes
Route.route("/:id")
    .get(auth, getBlogById)
    .put(auth, isAdmin, putBlog)//isAdmin
    .delete(auth, isAdmin, deleteBlog);//isAdmin

module.exports = Route;