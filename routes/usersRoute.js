const Route = require("express").Router();
const { getUserById, getUsers, postUser, putUser, deleteUser, login, sendEmail } = require("../controllers/usersController");
const { validUserInputs } = require("../middleware/usersValidator");
const auth = require("../middleware/tokenAuthenticator");
const {isAdmin, isHostAdmin} = require("../middleware/rolesAuthenticator");

Route.get("/", auth, isAdmin, getUsers);
Route.post("/createuser", auth, isAdmin, validUserInputs(), postUser);
Route.post("/login", auth, login);
Route.post("/contact", sendEmail);
//Alternative syntax for practice purposes
Route.route("/:id")
    .get(auth, getUserById)
<<<<<<< HEAD
    .put(auth, validUserInputs(), isHostAdmin, putUser)
=======
    .put(auth, isHostAdmin, putUser)
>>>>>>> origin/master
    .delete(auth, isAdmin, deleteUser);

module.exports = Route;