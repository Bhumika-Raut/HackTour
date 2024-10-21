const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Ensure name is unique
    password: { type: String, required: true },
    profileImage: { type: String, required: true },
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
