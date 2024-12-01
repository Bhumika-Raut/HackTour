const express = require('express');
const router = express.Router();
const TechEntity = require('./schema');            
const RandomEntity = require('./randomSchema');    
const SavedEntity = require('./savedSchema');      
const Account = require('./accountSchema');        
const multer = require('multer');                  

router.use(express.json());
router.use(require('cors')());

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    },
});

const upload = multer({ storage: storage });

// Fetch all tech entities (limit to 2000)
router.get('/tech', async (req, res) => {
    try {
        const tech = await TechEntity.find().limit(2000).exec();
        res.json(tech);
    } catch (err) {
        console.error('Error in GET tech request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Fetch random entities for the homepage
router.get('/home', async (req, res) => {
    try {
        const random = await RandomEntity.find().limit(2000).exec();
        res.json(random);
    } catch (err) {
        console.error('Error in GET random request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add new entity (POST request)
router.post('/add', async (req, res) => {
    try {
        const { title, description, imageUrl, likes = 0 } = req.body;

        const newEntity = new RandomEntity({
            title,
            description,
            imageUrl,
            likes,
        });

        await newEntity.save();

        res.status(201).json({ message: 'Entity added successfully', entity: newEntity });
    } catch (err) {
        console.error('Error in POST home request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Signup Route (POST request)
router.post('/signup', async (req, res) => {
    try {
        const { name, password } = req.body;

        const existingAccount = await Account.findOne({ name });
        if (existingAccount) {
            return res.status(400).json({ error: 'Account already exists' });
        }

        const newAccount = new Account({ name, password });
        await newAccount.save();

        res.status(201).json({ message: 'Account created successfully' });
    } catch (err) {
        console.error('Error in POST signup request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login Route (POST request)
router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;

        const user = await Account.findOne({ name });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        res.json({ user });
    } catch (err) {
        console.error('Error in POST login request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/like/:id', async (req, res) => {
    const { userId } = req.body; 
    const { id } = req.params;  

    try {
        const randomEntity = await RandomEntity.findById(id);
        if (!randomEntity) {
            return res.status(404).send({ message: 'Entity not found' });
        }

        if (randomEntity.likedBy.includes(userId)) {
            return res.status(400).send({ message: 'You have already liked this entity!' });
        }

        randomEntity.likedBy.push(userId);
        randomEntity.likes += 1;

        await randomEntity.save();

        res.status(200).send({ likes: randomEntity.likes });
    } catch (err) {
        console.error('Error liking entity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.get('/account/liked-entities/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await Account.findById(userId).populate('likedEntities');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user.likedEntities);
    } catch (err) {
        console.error('Error fetching liked entities:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;