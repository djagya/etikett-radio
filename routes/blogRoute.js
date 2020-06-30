const Route = require("express").Router();
const { getBlogById, getBlog, postBlog, putBlog, deleteBlog } = require("../controllers/blogController");
const auth = require("../middleware/tokenAuthenticator");
const {isHostAdmin, isAdmin} = require("../middleware/rolesAuthenticator");

Route.get("/", auth, getBlog);
Route.post("/post", auth, isHostAdmin, postBlog); 
//Alternative syntax for practice purposes
Route.route("/:id")
    .get(auth, getBlogById)
    .put(auth, isHostAdmin, putBlog)
    .delete(auth, isHostAdmin, deleteBlog);

module.exports = Route;