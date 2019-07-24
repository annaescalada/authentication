'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  recipes: {
    type: [{
      type: ObjectId,
      ref: 'Recipe'
    }]
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
