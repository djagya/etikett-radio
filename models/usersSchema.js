const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');
const { encrypt, compare } = require('../lib/encrypt');
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pw: { type: String, required: true },
  role: {
    type: String,
    default: 'Host',
    required: true,
  },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
});

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, 'secretKey').toString(); //secretKey is a dummy for the admin pw
  user.tokens.push({ token });
  return token;
};

//only show the following data to the user, the rest stays hidden
UserSchema.methods.getPublicFields = function () {
  const returnObject = {
    firstName: this.firstName,
    lastName: this.lastName,
    userName: this.userName,
    email: this.email,
    _id: this._id,
    role: this.role,
  };
  return returnObject;
};

// compare pwInput with saved user.pw
UserSchema.methods.checkPW = async function (pwInput) {
  const user = this;
  return await compare(pwInput, user.pw);
};

//in the save function in postUser is a built-in function called pre and post
UserSchema.pre('save', async function (next) {
  // if (!this.isModified("pw")) return next() //for the future when we implement function to change the pw
  this.pw = await encrypt(this.pw);
  next();
});

//Find user by token
UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, 'secretKey');
  } catch (err) {
    return err;
  }

  return User.findOne({
    _id: decoded._id,
    // "tokens.token": token
  }).select('-pw -__v');
};

module.exports = mongoose.model('User', UserSchema);
