const mongoose = require('mongoose');

const savedSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',  
    required: true
  }
});

const SavedEntity = mongoose.model('SavedEntity', savedSchema);
module.exports = SavedEntity;
