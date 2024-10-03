const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String, // This will store the URL of the profile image
    },
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
