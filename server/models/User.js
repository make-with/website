const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 10,
    required: true,
    trim: true
  },
  id: {
    type: String,
    maxlength: 20,
    required: true,
    trim: true,
    unique: 1
  },
  email: {
    type: String,
    maxlength: 30,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    trim: true
  },
  role: {
    type: Number,
    default: 0
  },
  image: {
    type: String
  },
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
}, {timestamps: true}, {versionKey: false});

userSchema.pre('save', function(next) {
  var user = this;

  if(user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) {
        return next(err)
      } 
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) {
          return next(err)
        } user.password = hash
          next()
      });
    });
  } else {
    next()
  };
});

userSchema.pre('findOneAndUpdate', function (next) {
  // eslint-disable-line consistent-return
  if (!this._update || !this._update.password) {
    return next();
  }
  const _self = this;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if(err) {
      return next(err);
    } 
    bcrypt.hash(_self._update.password, salt, function(err, hash) {
      if(err) {
        return next(err);
      } 
      _self._update.password = hash;
      next();
    });
  });
});


userSchema.methods.comparePassword = function(plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) {
      return cb(err)
    } cb(null, isMatch)
  });
};

userSchema.methods.generateToken = function(cb) {
  var user = this;

  var token = jwt.sign(user._id.toHexString(), 'secretToken');
  user.token = token;
  user.save(function(err, user) {
    if(err) {
      return cb(err)
    } cb(null, user)
  });
};

userSchema.statics.findByToken = function(token, cb) {
  var user = this;

  jwt.verify(token, 'secretToken', function(err, decoded) {
    user.findOne({'_id': decoded, 'token': token}, function(err, user) {
      if(err) {
        return cb(err)
      } cb(null, user)
    });
  });
};

const User = mongoose.model('User', userSchema);
module.exports = {User};
