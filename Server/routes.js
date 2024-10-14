const express = require('express');
const router = express.Router();
const TechEntity = require('./schema'); 
const RandomEntity = require('./randomSchema'); 
const SavedEntity = require('./savedSchema'); 
const Account = require('./accountSchema'); 
const cors = require('cors');

router.use(express.json());
router.use(cors());

// Get tech entities
router.get('/tech', async (req, res) => {
    try {
        const tech = await TechEntity.find().limit(2000).exec(); 
        res.json(tech);
    } catch (err) {
        console.error('Error in GET tech request', err);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
});

// Get home random entities
router.get('/home', async (req, res) => {
    try {
        const random = await RandomEntity.find().limit(2000).exec(); 
        res.json(random);
    } catch (err) {
        console.error('Error in GET random request', err);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
});

// Get saved entities by user ID
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

// Like an entity
router.post('/like/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const entity = await RandomEntity.findById(id); 

        if (!entity) {
            return res.status(404).json({ error: 'Entity not found' });
        }

        entity.likes = (entity.likes || 0) + 1;
        await entity.save(); 

        res.json({ message: 'Like updated successfully', likes: entity.likes });
    } catch (err) {
        console.error('Error in POST like request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Save an entity
router.post('/saved/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const entity = await RandomEntity.findById(id);  

        if (!entity) {
            return res.status(404).json({ error: 'Entity not found' });
        }

        const savedEntity = new SavedEntity({ ...entity.toObject(), userId: req.body.userId });  // Assuming you're saving userId from request body
        await savedEntity.save();  

        res.json({ message: 'Entity saved successfully' });
    } catch (err) {
        console.error('Error in POST saved request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { name, password, profileImage } = req.body;

        const existingAccount = await Account.findOne({ name });
        if (existingAccount) {
            return res.status(400).json({ error: 'Account already exists' });
        }

        const newAccount = new Account({ name, password, profileImage });
        await newAccount.save();

        res.status(201).json({ message: 'Account created successfully' });
    } catch (err) {
        console.error('Error in POST signup request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
