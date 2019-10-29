const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatMessageSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  date: Date,
  writer: String,
  isMasked: Boolean,
  isVerified: Boolean,
  isMModerator: Boolean,
  isAdmin: Boolean
});

module.exports = mongoose.model("ChatMessage", ChatMessageSchema);
