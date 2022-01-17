const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const askcommentSchema = mongoose.Schema({
  askId: {
    type: Schema.Types.ObjectId,
    ref: 'Ask'
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  replyTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String
  }
}, {timestamps: true}, {versionKey: false});

const AskComment = mongoose.model('AskComment', askcommentSchema);
module.exports = {AskComment};