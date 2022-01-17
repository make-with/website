const mongoose = require('mongoose');

const fundingSchema = mongoose.Schema({
  creator: {
    type: String,
    maxlength: 10,
    required: true
  },
  title: {
    type: String,
    maxlength: 30,
    required: true
  },
  content: {
    type: String,
    maxlength: 300,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  pay: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  }
}, {timestamps: true}, {versionKey: false});

const Funding = mongoose.model('Funding', fundingSchema);
module.exports = {Funding};
