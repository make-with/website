const express = require('express');
const upload = require('../utils/upload');
const { auth } = require('../middleware/auth');
const { User } = require('../models/User');
const { Like } = require('../models/Like');

const userRouter = express.Router();

/** auth */
userRouter.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).json({ success: true });
  });
});

userRouter.post('/api/users/login', (req, res) => {
  User.findOne({ id: req.body.id }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '존재하지 않는 아이디입니다.',
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 일치하지 않습니다.',
        });
      }
      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        res.cookie('x_auth', user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

userRouter.get('/api/users/logout', auth, (req, res) => {
  User.findByIdAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).send({ success: true });
  });
});

/** my-pages */
userRouter.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    name: req.user.name,
    id: req.user.id,
    email: req.user.email,
    role: req.user.role,
    image: req.user.image,
  });
});

userRouter.post('/api/mypage/like', (req, res) => {
  Like.find({ userId: req.body.userId })
    .populate('askId')
    .exec((err, likeAsks) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      res.status(200).json({ success: true, likeAsks });
    });
});

userRouter.post('/api/profile/image', (req, res) => {
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

userRouter.post('/api/profile/upload', (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body.userId },
    { password: req.body.password, image: req.body.image },
    { multi: true, new: true },
  ).exec((err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    res.status(200).json({ success: true });
  });
});

module.exports = userRouter;
