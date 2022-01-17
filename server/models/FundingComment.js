const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fundingcommentSchema = mongoose.Schema({
  fundingId: {
    type: Schema.Types.ObjectId,
    ref: 'Funding'
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

const FundingComment = mongoose.model('FundingComment', fundingcommentSchema);
module.exports = {FundingComment};