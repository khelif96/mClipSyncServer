const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: false
  },
  updatedAt: {
    type: Number,
    required: false
  },
  currentClip: {
    type: String,
    required: false
  }
});

userSchema.pre('save', function (next) {
  this.email = this.email.toLowerCase();
  let currentDate = new Date().getTime();
  this.updatedAt = currentDate;
  if (!this.created_at) {
    this.createdAt = currentDate;
  }
  next();
});


var user = mongoose.model('user', userSchema);

module.exports = user;
