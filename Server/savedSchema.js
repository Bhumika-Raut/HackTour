const mongoose = require('mongoose');

const savedSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }, // Add a reference to the Account
});

const SavedEntity = mongoose.model('SavedEntity', savedSchema);
module.exports = SavedEntity;
