const express = require('express');
const router = express.Router();
const TechEntity = require('./schema');            // Import other schema (assuming existing ones)
const RandomEntity = require('./randomSchema');    // Random entity schema
const SavedEntity = require('./savedSchema');      // Saved entity schema
const Account = require('./accountSchema');        // Import account schema
const multer = require('multer');                  // Import multer for file uploads

// Middleware for parsing JSON and enabling CORS
router.use(express.json());
router.use(require('cors')());

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Upload directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Add timestamp to avoid name clashes
    },
});
const upload = multer({ storage: storage });

// Route to fetch tech entities
router.get('/tech', async (req, res) => {
    try {
        const tech = await TechEntity.find().limit(2000).exec();
        res.json(tech);
    } catch (err) {
        console.error('Error in GET tech request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to fetch random home entities
router.get('/home', async (req, res) => {
    try {
        const random = await RandomEntity.find().limit(2000).exec();
        res.json(random);
    } catch (err) {
        console.error('Error in GET random request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to fetch saved entities by user ID
router.get('/saved/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const saved = await SavedEntity.find({ userId }).limit(2000).exec();
        res.json(saved);
    } catch (err) {
        console.error('Error in GET saved request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to like an entity
router.post('/like/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const entity = await RandomEntity.findById(id);

        if (!entity) {
            return res.status(404).json({ error: 'Entity not found' });
        }

        entity.likes = (entity.likes || 0) + 1;  // Increment likes
        await entity.save();

        res.json({ message: 'Like updated successfully', likes: entity.likes });
    } catch (err) {
        console.error('Error in POST like request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to save an entity
router.post('/saved/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const entity = await RandomEntity.findById(id);

        if (!entity) {
            return res.status(404).json({ error: 'Entity not found' });
        }

        const savedEntity = new SavedEntity({ ...entity.toObject(), userId: req.body.userId });
        await savedEntity.save();

        res.json({ message: 'Entity saved successfully' });
    } catch (err) {
        console.error('Error in POST saved request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to handle sign up
router.post('/signup', async (req, res) => {
    try {
        const { name, password, profileImage } = req.body;

        // Check if the account already exists
        const existingAccount = await Account.findOne({ name });
        if (existingAccount) {
            return res.status(400).json({ error: 'Account already exists' });
        }

        // Create and save the new account
        const newAccount = new Account({ name, password, profileImage });
        await newAccount.save();

        res.status(201).json({ message: 'Account created successfully' });
    } catch (err) {
        console.error('Error in POST signup request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
