const express = require('express');
const { Funding } = require('../models/Funding');
const { FundingComment } = require('../models/FundingComment');

const fundingRouter = express.Router();

/** funding */
fundingRouter.post('/api/funding', (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  Funding.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .exec((err, fundingInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      res
        .status(200)
        .json({ success: true, fundingInfo, PostSize: fundingInfo.length });
    });
});

fundingRouter.post('/api/funding/new', (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  Funding.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .exec((err, fundingInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      res.status(200).json({ success: true, fundingInfo });
    });
});

fundingRouter.post('/api/funding/like', (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  Funding.find()
    .sort({ views: -1 })
    .limit(limit)
    .skip(skip)
    .exec((err, fundingInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      res.status(200).json({ success: true, fundingInfo });
    });
});

fundingRouter.get('/api/funding/fundings_by_id', (req, res) => {
  let type = req.query.type;
  let fundingId = req.query.id;
  Funding.find({ _id: fundingId }).exec((err, fundingInfo) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    fundingInfo[0].views++;
    fundingInfo[0].save();
    res.status(200).json({ success: true, fundingInfo });
  });
});

/** comment */
fundingRouter.post('/api/funding/comment/savecomment', (req, res) => {
  const fundingComment = new FundingComment(req.body);
  fundingComment.save((err, fundingComment) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    FundingComment.find({ _id: fundingComment._id })
      .populate('writer', 'id image')
      .exec((err, result) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }
        res.status(200).json({ success: true, result });
      });
  });
});

fundingRouter.post('/api/funding/comment/getcomment', (req, res) => {
  FundingComment.find({ fundingId: req.body.fundingId })
    .populate('writer', 'id image')
    .exec((err, fundingComments) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      res.status(200).json({ success: true, fundingComments });
    });
});

module.exports = fundingRouter;
