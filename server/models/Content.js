const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
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
  image: {
    type: String,
    required: true
  },
  profile: {
    type: String,
    required: true
  },
  link: {
    type: String,
    require: true
  }
}, {timestamps: true}, {versionKey: false});

const Content = mongoose.model('Content', contentSchema);
module.exports = {Content};