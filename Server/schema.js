const mongoose = require('mongoose');

const TechnologySchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String
});

const TechEntity = mongoose.model('technology-collections', TechnologySchema); 

module.exports = TechEntity;
