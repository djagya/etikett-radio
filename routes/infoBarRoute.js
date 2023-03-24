const Route = require('express').Router();
const {
  getInfoBarById,
  getInfoBar,
  postInfoBar,
  putInfoBar,
  deleteInfoBar,
} = require('../controllers/infoBarController');
const auth = require('../middleware/tokenAuthenticator');
const { isAdmin } = require('../middleware/rolesAuthenticator');

Route.get('/', auth, getInfoBar);
Route.post('/post', isAdmin, auth, postInfoBar);
//Alternative syntax for practice purposes
Route.route('/:id')
  .get(auth, getInfoBarById)
  .put(auth, isAdmin, putInfoBar)
  .delete(auth, isAdmin, deleteInfoBar);

module.exports = Route;
