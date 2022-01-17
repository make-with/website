const express = require('express');
const upload = require('../utils/upload');
const { Ask } = require('../models/Ask');
const { Like } = require('../models/Like');
const { AskComment } = require('../models/AskComment');

const askRouter = express.Router();

/** asks  */
askRouter.post('/api/ask/image', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return req.json({ success: false, err });
    }
    res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

askRouter.post('/api/ask/upload', (req, res) => {
  const ask = new Ask(req.body);
  ask.save((err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    res.status(200).json({ success: true });
  });
});

askRouter.post('/api/ask', (req, res) => {
  let term = req.body.SearchTerm;
  if (term) {
    Ask.find()
      .find({ $text: { $search: term } })
      .populate('writer', 'id')
      .sort({ createdAt: -1 })
      .exec((err, askInfo) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }
        res.status(200).json({ success: true, askInfo });
      });
  } else {
    Ask.find()
      .populate('writer', 'id')
      .sort({ createdAt: -1 })
      .exec((err, askInfo) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }
        res.status(200).json({ success: true, askInfo });
      });
  }
});

askRouter.post('/api/ask/like', (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  Ask.find()
    .sort({ likes: -1 })
    .limit(limit)
    .exec((err, askInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      res.status(200).json({ success: true, askInfo });
    });
});

askRouter.post('/api/ask/view', (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  Ask.find()
    .sort({ views: -1 })
    .limit(limit)
    .exec((err, askInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      res.status(200).json({ success: true, askInfo });
    });
});

askRouter.get('/api/ask/asks_by_id', (req, res) => {
  let type = req.query.type;
  let askId = req.query.id;
  Ask.find({ _id: askId })
    .populate('writer', 'id')
    .exec((err, askInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      askInfo[0].views++;
      askInfo[0].save();
      res.status(200).json({ success: true, askInfo });
    });
});

/** likes  */
askRouter.post('/api/like', (req, res) => {
  Like.find({ askId: req.body.askId }).exec((err, likes) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    res.status(200).json({ success: true, likes });
  });
});

askRouter.post('/api/like/uplike', (req, res) => {
  const like = new Like({ askId: req.body.askId, userId: req.body.userId });
  like.save((err, likes) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    Like.find({ askId: req.body.askId })
      .populate('askId', 'likes')
      .exec((err, likes) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }
        likes[0].askId.likes++;
        likes[0].askId.save();
        res.status(200).json({ success: true });
      });
  });
});

askRouter.post('/api/like/downlike', (req, res) => {
  Like.findOneAndDelete({
    askId: req.body.askId,
    userId: req.body.userId,
  }).exec((err, likes) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    likes[0].askId.likes - 1;
    likes[0].askId.save();
    res.status(200).json({ success: true });
  });
});

/** comments */
askRouter.post('/api/ask/comment/savecomment', (req, res) => {
  const askComment = new AskComment(req.body);
  askComment.save((err, askComment) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    AskComment.find({ _id: askComment._id })
      .populate('writer', 'id image')
      .exec((err, result) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }
        res.status(200).json({ success: true, result });
      });
  });
});

askRouter.post('/api/ask/comment/getcomment', (req, res) => {
  AskComment.find({ askId: req.body.askId })
    .populate('writer', 'id image')
    .exec((err, askComments) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      res.status(200).json({ success: true, askComments });
    });
});

module.exports = askRouter;
