const express = require('express');
const router = express.Router();
const TechEntity = require('./schema'); 
const RandomEntity = require('./randomSchema'); 
const SavedEntity = require('./savedSchema'); // Make sure this schema is defined
const cors = require('cors');

router.use(express.json());
router.use(cors());

router.get('/tech', async (req, res) => {
    try {
        const tech = await TechEntity.find().limit(2000).exec(); 
        res.json(tech);
    } catch (err) {
        console.log('Error in GET tech request', err);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
});

router.get('/home', async (req, res) => {
    try {
        const random = await RandomEntity.find().limit(2000).exec(); 
        res.json(random);
    } catch (err) {
        console.log('Error in GET random request', err);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
});

router.get('/saved', async (req, res) => {
    try {
        const saved = await SavedEntity.find().limit(2000).exec();
        res.json(saved);
    } catch (err) {
        console.log('Error in GET saved request', err);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
});

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

router.post('/saved/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const entity = await RandomEntity.findById(id);  // Find the entity by ID

        if (!entity) {
            return res.status(404).json({ error: 'Entity not found' });
        }

        const savedEntity = new SavedEntity(entity.toObject());  // Copy the data
        await savedEntity.save();  // Save to the Saved collection

        res.json({ message: 'Entity saved successfully' });
    } catch (err) {
        console.log('Error in POST saved request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
