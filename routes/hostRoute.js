const Route = require("express").Router();
const { getHostById, getHost, postHost, putHost, deleteHost } = require("../controllers/hostController");
const auth = require("../middleware/tokenAuthenticator");
const isAdmin = require("../middleware/rolesAuthenticator");

Route.get("/", auth, getHost);
Route.post("/post", auth, isAdmin, postHost); 
//Alternative syntax for practice purposes
Route.route("/:id")
    .get(auth, getHostById)
    .put(auth, isAdmin, putHost)
    .delete(auth, isAdmin, deleteHost);

module.exports = Route;