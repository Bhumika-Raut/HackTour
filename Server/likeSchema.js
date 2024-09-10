const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0, 
    },
});

module.exports = mongoose.model('LikeEntity', likeSchema);
