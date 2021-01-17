const mongoose = require('mongoose');
const ClubSchema = require('./club');
const UserSchema = require('./user');

module.exports = {
  Club: mongoose.model('Club', ClubSchema),
  User: mongoose.model('User', UserSchema),
};
