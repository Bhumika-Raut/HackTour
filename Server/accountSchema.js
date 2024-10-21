const mongoose = require('mongoose');

// Define the Account schema
const accountSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Ensure name is unique
    password: { type: String, required: true },           // Password is required
    profileImage: { type: String, required: true },       // Profile image (URL) is required
});

// Create and export the Account model
const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
