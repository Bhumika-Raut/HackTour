const mongoose = require('mongoose');

const RandomSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String
});

const RandomEntity = mongoose.model('random-collections', RandomSchema); 

module.exports = RandomEntity;
