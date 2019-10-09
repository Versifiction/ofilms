/* eslint-disable no-undef */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: String,
  lastname: String,
  sexe: String,
  mobilePhone: Number,
  departement: Number,
  city: String,
  likes: Array,
  dislikes: Array,
  lists: Array,
  creationDate: {
    type: Date,
    default: Date.now
  },
  lastConnection: Date,
  isAdmin: Boolean,
  isModerator: Boolean,
  isConnected: Boolean
});

module.exports = User = mongoose.model("users", UserSchema);
