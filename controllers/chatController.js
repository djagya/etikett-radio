const users = [];

exports.addUser = ({ id, name, room }) => {
  name = name.trim().toLocaleLowerCase();
  room = room.trim().toLocaleLowerCase();

  // Make sure names are different
  // const existingUser = users.find((user) => user.name === name);
  // if (existingUser) {
  //   console.log('User is already taken!')
  //   return { error: 'Username is already taken.'}
  // }

  // Create user
  const user = { id, name, room };
  users.push(user);
  console.log(users); /////////////////////////////////////////////////
  return { user }
};

exports.removeUser = id => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  console.log(users)
}

exports.getUser = id => users.find((user) => user.id === id);

exports.getUsersInRoom = async (req, res, next) => {
  try {
    const chatUsers = users;
    res.json({ success: true, chatUsers: users })
  }
  catch (err) {
    next(err)
  }
}