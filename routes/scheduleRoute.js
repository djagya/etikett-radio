const Route = require("express").Router();
const { getScheduleById, getSchedule, postSchedule, putSchedule, deleteSchedule } = require("../controllers/scheduleController");
const auth = require("../middleware/tokenAuthenticator");
const isAdmin = require("../middleware/rolesAuthenticator");

Route.get("/", auth, getSchedule);
Route.post("/post", auth, postSchedule); //isAdmin
//Alternative syntax for practice purposes
Route.route("/:id")
    .get(auth, getScheduleById)
    .put(auth, putSchedule)//isAdmin
    .delete(auth, deleteSchedule);//isAdmin

module.exports = Route;