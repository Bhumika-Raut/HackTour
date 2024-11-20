// accountSchema.js
const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: false, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    savedItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SavedEntity', // Reference to SavedEntity model
    }],
});

module.exports = mongoose.model('Account', accountSchema);
