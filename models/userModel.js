const { Schema, model } = require('mongoose');

/**
 * @typedef {Object} UserDocument
 * @property {string} name - The name of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {Date} date - The date the user was registered.
 * @property {boolean} isAdmin - Whether the user is an admin or not.
 */

/**
 * User schema for MongoDB.
 * @type {import('mongoose').Schema<UserDocument>}
 */
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
  },
  
  password: {
    type: String,
    required: true,
  },
  
  date: {
    type: Date,
    default: Date.now,
  },
  
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

/**
 * Mongoose model representing a user.
 * @type {import('mongoose').Model<UserDocument>}
 */
const User = model('User', userSchema);

module.exports = User;
