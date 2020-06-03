const Route = require("express").Router();
const { getSchemaById, getSchema, postSchema, putSchema, deleteSchema } = require("../controllers/schemaController");
const auth = require("../middleware/tokenAuthenticator");
const isAdmin = require("../middleware/rolesAuthenticator");

Route.get("/", auth, getSchema);
Route.post("/post", auth, postSchema); //isAdmin
//Alternative syntax for practice purposes
Route.route("/:id")
    .get(auth, getSchemaById)
    .put(auth, putSchema)//isAdmin
    .delete(auth, deleteSchema);//isAdmin

module.exports = Route;