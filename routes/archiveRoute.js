const Route = require("express").Router();
const { getArchiveById, getArchive, postArchive, putArchive, deleteArchive } = require("../controllers/archiveController");
const auth = require("../middleware/tokenAuthenticator");
const isAdmin = require("../middleware/rolesAuthenticator");

Route.get("/", auth, getArchive);
Route.post("/post", auth, isAdmin, postArchive); //isAdmin
//Alternative syntax for practice purposes
Route.route("/:id")
    .get(auth, getArchiveById)
    .put(auth, isAdmin, putArchive)//isAdmin
    .delete(auth, isAdmin, deleteArchive);//isAdmin

module.exports = Route;