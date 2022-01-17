const mongoose = require('mongoose');

const paySchema = mongoose.Schema({
  user: {
    type: Array,
    default: []
  },
  data: {
    type: Array,
    default: []
  },
  funding: {
    type: Array,
    default: []
  }
});

const Pay = mongoose.model('Pay', paySchema);
module.exports = {Pay};