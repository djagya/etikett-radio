const path = require('path');

exports.indexController = (req, res, next) => {
  //set up base route //request to see data

  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
};
