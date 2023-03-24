const Route = require('express').Router();
const {
  getUserById,
  getUsers,
  postUser,
  putUser,
  deleteUser,
  login,
  sendEmail,
  patchUser,
} = require('../controllers/usersController');
const { validUserInputs } = require('../middleware/usersValidator');
const auth = require('../middleware/tokenAuthenticator');
const { isAdmin, isHostAdmin } = require('../middleware/rolesAuthenticator');

Route.get('/', auth, getUsers);
Route.post('/createuser', auth, isAdmin, validUserInputs(), postUser);
Route.post('/login', auth, login);
Route.post('/contact', sendEmail);
Route.route('/:id')
  .get(auth, isHostAdmin, getUserById)
  .put(auth, isHostAdmin, putUser)
  .patch(auth, isHostAdmin, patchUser)
  .delete(auth, isAdmin, deleteUser);

module.exports = Route;
