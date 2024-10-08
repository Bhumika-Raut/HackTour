const express = require('express');
const router = express.Router();
const TechEntity = require('./schema'); 
const RandomEntity = require('./randomSchema'); 
const SavedEntity = require('./savedSchema'); 
const Account = require('./accountSchema'); // Make sure this is the correct path for your account schema
const cors = require('cors');

router.use(express.json());
router.use(cors());

// Get tech entities
router.get('/tech', async (req, res) => {
    try {
        const tech = await TechEntity.find().limit(2000).exec(); 
        res.json(tech);
    } catch (err) {
        console.log('Error in GET tech request', err);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
});

// Get home random entities
router.get('/home', async (req, res) => {
    try {
        const random = await RandomEntity.find().limit(2000).exec(); 
        res.json(random);
    } catch (err) {
        console.log('Error in GET random request', err);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
});

// Get saved entities
router.get('/saved', async (req, res) => {
    try {
        const saved = await SavedEntity.find().limit(2000).exec();
        res.json(saved);
    } catch (err) {
        console.log('Error in GET saved request', err);
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
        console.log('Error in POST like request', err);
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

        const savedEntity = new SavedEntity(entity.toObject());  
        await savedEntity.save();  

        res.json({ message: 'Entity saved successfully' });
    } catch (err) {
        console.log('Error in POST saved request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Signup route
router.post('/signup', async (req, res) => {
    const { name, password, profileImage } = req.body;

    // Basic validation
    if (!name || !password) {
        return res.status(400).json({ error: 'Name and password are required' });
    }

    const newAccount = new Account({
        name,
        password,
        profileImage,
    });

    try {
        await newAccount.save();
        res.status(201).json({ message: 'User created successfully', user: newAccount });
    } catch (error) {
        console.log('Error creating user', error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Get account information (example)
router.get('/account', async (req, res) => {
    try {
        const userId = req.user.id; // Get the user ID from the request (you might want to implement authentication)
        const user = await Account.findById(userId); // Assuming Account is the correct model for user
        const savedHacks = await SavedEntity.find({ userId }); // Assuming saved hacks are linked to the user
        res.json({ user, savedHacks });
    } catch (err) {
        console.error('Error fetching account data', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
