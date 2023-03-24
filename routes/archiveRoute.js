const Route = require('express').Router();
const {
  getArchiveById,
  getArchive,
  postArchive,
  putArchive,
  deleteArchive,
} = require('../controllers/archiveController');
const auth = require('../middleware/tokenAuthenticator');
const { isHostAdmin, isAdmin } = require('../middleware/rolesAuthenticator');

Route.get('/', auth, getArchive);
Route.post('/post', auth, isHostAdmin, postArchive);
//Alternative syntax for practice purposes
Route.route('/:id')
  .get(auth, getArchiveById)
  .put(auth, isHostAdmin, putArchive)
  .delete(auth, isAdmin, deleteArchive);

module.exports = Route;
