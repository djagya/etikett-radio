const Route = require("express").Router();
const { getUserById, getUser, postUser, putUser, deleteUser, login } = require("../controllers/usersController");
const { validUserInputs } = require("../middleware/usersValidator");
const auth = require("../middleware/tokenAuthenticator");
const isAdmin = require("../middleware/rolesAuthenticator");

Route.get("/", auth, isAdmin, getUser);
Route.post("/signup", validUserInputs(), postUser);
Route.post("/login", auth, login)
//Alternative syntax for practice purposes
Route.route("/:id")
    .get(auth, getUserById)
    .put(auth, putUser)
    .delete(auth, deleteUser);

module.exports = Route;