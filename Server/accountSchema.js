const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    likedEntities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RandomEntity' }]
});

module.exports = mongoose.model('Account', accountSchema);
