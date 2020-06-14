const Route = require("express").Router();
const { getInfoBarById, getInfoBar, postInfoBar, putInfoBar, deleteInfoBar } = require("../controllers/infoBarController");
const auth = require("../middleware/tokenAuthenticator");
const {isHostAdmin} = require("../middleware/rolesAuthenticator");

Route.get("/", auth, getInfoBar);
Route.post("/post", isHostAdmin, auth, postInfoBar); 
//Alternative syntax for practice purposes
Route.route("/:id")
    .get(auth, getInfoBarById)
    .put(auth, isHostAdmin, putInfoBar)
    .delete(auth, isHostAdmin, deleteInfoBar);

module.exports = Route;