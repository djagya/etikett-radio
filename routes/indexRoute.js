const Route = require("express").Router();
const { indexController } = require("../controllers/indexController");

Route.get("/", indexController);

module.exports = Route;