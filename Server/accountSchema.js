const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure that account names are unique
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: false, // Profile image is optional
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the Account model
module.exports = mongoose.model('Account', accountSchema);
