const RandomSchema = new mongoose.Schema({
    title: String,
    image: String, // Ensure the field name matches with what you're using in the frontend
    description: String,
    likes: {
        type: Number,
        default: 0,
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }], // Ensure this field is present
});

const RandomEntity = mongoose.model('random-collections', RandomSchema); 

module.exports = RandomEntity;
