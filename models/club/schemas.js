const { Schema } = require('mongoose');

const ClubSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
    lowercase: true,
  },
  stadium: String,
  foundedIn: String,
  founders: [{ type: String }],
  coach: String,
  captain: String,
});

module.exports = ClubSchema;
