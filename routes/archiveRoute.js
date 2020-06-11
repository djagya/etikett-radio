const Route = require("express").Router();
const { getArchiveById, getArchive, postArchive, putArchive, deleteArchive } = require("../controllers/archiveController");
const auth = require("../middleware/tokenAuthenticator");
const {isAdmin} = require("../middleware/rolesAuthenticator");

Route.get("/", auth, getArchive);
Route.post("/post", auth, isAdmin, postArchive); 
//Alternative syntax for practice purposes
Route.route("/:id")
    .get(auth, getArchiveById)
    .put(auth, isAdmin, putArchive)
    .delete(auth, isAdmin, deleteArchive);

module.exports = Route;