const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true, enum: ['male', 'female']},
  password: { type: String, required: true },
  profilepic: { type: String }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = { User };
