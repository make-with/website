const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
  askId: {
    type: Schema.Types.ObjectId,
    ref: 'Ask'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true}, {versionKey: false});

const Like = mongoose.model('Like', likeSchema);
module.exports = {Like};
