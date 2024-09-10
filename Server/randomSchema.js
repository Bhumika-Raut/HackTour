const mongoose = require('mongoose');

const RandomSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    likes: {
        type: Number,
        default: 0,  
    }
});

const RandomEntity = mongoose.model('random-collections', RandomSchema); 

module.exports = RandomEntity;
