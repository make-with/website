const express = require('express');
const { Content } = require('../models/Content');

const contentRouter = express.Router();

contentRouter.post('/api/content', (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  Content.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .exec((err, contentInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      res
        .status(200)
        .json({ success: true, contentInfo, PostSize: contentInfo.length });
    });
});

contentRouter.post('/api/content/new', (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  Content.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .exec((err, contentInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      res.status(200).json({ success: true, contentInfo });
    });
});

module.exports = contentRouter;
