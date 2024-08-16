const express = require('express');
const router = express.Router();
const TechEntity = require('./schema'); 

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

module.exports = router;
