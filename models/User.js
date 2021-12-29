const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  
  uhid: {
    type: String,
    required: true
  },
  
  name: {
    type: String,
    required: true
  },
  
  profileLink: {
    type: String,
    required: true
  },
  
  movies: {
    type: Array,
    required: true
  },

  recentMovie: {
    type: Object,
    requried: true
  }, 
  
  lastUpdated: {
    type: Number,
    required: true
  }
  
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
