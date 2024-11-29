const accountSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    likedEntities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'random-collections' }], // Make sure this is set up correctly
});

module.exports = mongoose.model('Account', accountSchema);
