const express = require('express');
const router = express.Router();
const TechEntity = require('./schema'); 
const LikeEntity = require('./likeSchema');
const RandomEntity = require('./randomSchema'); 

const cors = require('cors');

router.use(express.json());
router.use(cors());

// GET route for tech data
router.get('/tech', async (req, res) => {
    try {
        const tech = await TechEntity.find().limit(2000).exec(); 
        res.json(tech);
    } catch (err) {
        console.log('Error in GET tech request', err);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
});

// GET route for home data
router.get('/home', async (req, res) => {
    try {
        const random = await RandomEntity.find().limit(2000).exec(); 
        res.json(random);
    } catch (err) {
        console.log('Error in GET random request', err);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
});

// POST route to handle likes
router.post('/like/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the entity ID from request params
        const entity = await RandomEntity.findById(id); // Find the entity by ID

        if (!entity) {
            return res.status(404).json({ error: 'Entity not found' });
        }

        // Increment the like count
        entity.likes = (entity.likes || 0) + 1;
        await entity.save(); // Save the updated entity

        res.json({ message: 'Like updated successfully', likes: entity.likes });
    } catch (err) {
        console.log('Error in POST like request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
