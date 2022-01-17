const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const askSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    creator: {
      type: String,
      maxlength: 10,
      required: true,
    },
    title: {
      type: String,
      maxlength: 30,
      required: true,
    },
    content: {
      type: String,
      maxlength: 300,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
  { versionKey: false },
);

askSchema.index(
  {
    creator: 'text',
    title: 'text',
    content: 'text',
  },
  {
    weights: {
      creator: 3,
      title: 2,
      content: 1,
    },
  },
);

const Ask = mongoose.model('Ask', askSchema);
module.exports = { Ask };
