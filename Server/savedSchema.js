const mongoose = require('mongoose');

const savedEntitySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    // Add other fields as necessary
});

const SavedEntity = mongoose.model('SavedEntity', savedEntitySchema);
module.exports = SavedEntity;
