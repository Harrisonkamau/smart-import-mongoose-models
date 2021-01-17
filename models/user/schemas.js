const { Schema } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirmation: {
    type: String,
    required: true,
  },
  age: Number,
  isRetired: {
    type: Boolean,
    default: false,
  },

  nationality: String,
  role: {
    type: String,
    required: true,
    enum: ['owner', 'coach', 'captain', 'player'],
    default: 'player',
  },
});

module.exports = UserSchema;
