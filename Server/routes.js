const express = require('express');
const router = express.Router();
const TechEntity = require('./schema');            
const RandomEntity = require('./randomSchema');    
const SavedEntity = require('./savedSchema');      
const Account = require('./accountSchema');        
const multer = require('multer');                  

router.use(express.json());
router.use(require('cors')());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    },
});
const upload = multer({ storage: storage });

router.get('/tech', async (req, res) => {
    try {
        const tech = await TechEntity.find().limit(2000).exec();
        res.json(tech);
    } catch (err) {
        console.error('Error in GET tech request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/home', async (req, res) => {
    try {
        const random = await RandomEntity.find().limit(2000).exec();
        res.json(random);
    } catch (err) {
        console.error('Error in GET random request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


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

router.post('/saved/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const entity = await RandomEntity.findById(id);

        if (!entity) {
            return res.status(404).json({ error: 'Entity not found' });
        }

        // Check if the user already saved this entity
        const existingSavedEntity = await SavedEntity.findOne({ userId: req.body.userId, entityId: id });
        if (existingSavedEntity) {
            return res.status(400).json({ error: 'Entity already saved by this user' });
        }

        const savedEntity = new SavedEntity({
            ...entity.toObject(),
            userId: req.body.userId,
        });

        await savedEntity.save();

        
        const user = await Account.findById(req.body.userId);
        if (user) {
            user.savedItems.push(savedEntity);
            await user.save();
        }

        res.json({ message: 'Entity saved successfully' });
    } catch (err) {
        console.error('Error in POST saved request', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
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

// Login Route
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
            return res.status(400).send({ message: 'You already liked this entity' });
        }

        randomEntity.likedBy.push(userId);
        randomEntity.likes += 1;

        await randomEntity.save();

        res.status(200).send({ message: 'Entity liked successfully', likes: randomEntity.likes });
    } catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
});

module.exports = router;

