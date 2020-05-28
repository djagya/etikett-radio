const Route = require("express").Router();
const { getArchiveById, getArchive, postArchive, putArchive, deleteArchive } = require("../controllers/archiveController");
const auth = require("../middleware/tokenAuthenticator");
const isAdmin = require("../middleware/rolesAuthenticator");

Route.get("/", auth, getArchive);
Route.post("/post", auth, postArchive); //isAdmin
//Alternative syntax for practice purposes
Route.route("/:id")
    .get(auth, getArchiveById)
    .put(auth, putArchive)//isAdmin
    .delete(auth, deleteArchive);//isAdmin

module.exports = Route;