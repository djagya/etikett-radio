const Route = require('express').Router();
const { getUsersInRoom } = require('../controllers/chatController');
const auth = require('../middleware/tokenAuthenticator');

Route.get('/', auth, getUsersInRoom);

module.exports = Route;
