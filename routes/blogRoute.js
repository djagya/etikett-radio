const Route = require("express").Router();
const { getBlogById, getBlog, postBlog, putBlog, deleteBlog } = require("../controllers/blogController");
const auth = require("../middleware/tokenAuthenticator");
const isAdmin = require("../middleware/rolesAuthenticator");

Route.get("/", auth, getBlog);
Route.post("/post", auth, isAdmin, postBlog); 
//Alternative syntax for practice purposes
Route.route("/:id")
    .get(auth, getBlogById)
    .put(auth, isAdmin, putBlog)
    .delete(auth, isAdmin, deleteBlog);

module.exports = Route;