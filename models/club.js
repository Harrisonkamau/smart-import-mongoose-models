const { Schema } = require('mongoose');
const User = require('./user');

const ClubSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  stadium: String,
  foundedIn: String,
  founders: [User],
  coach: User,
  captain: User,
});

module.exports = ClubSchema;
