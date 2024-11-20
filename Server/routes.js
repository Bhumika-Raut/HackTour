const express = require('express');
const router = express.Router();
const TechEntity = require('./schema');
const RandomEntity = require('./randomSchema');
const SavedEntity = require('./savedSchema');
const Account = require('./accountSchema');
const multer = require('multer');

// MongoDB Models for additional features
const mongoose = require('mongoose');
const UserModel = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
}));
const SavedItemsModel = mongoose.model('SavedItem', new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  image: String,
}));

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Routes

// Signup Route (added in this implementation)
router.post('/signup', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new UserModel({ name, email });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful', user: newUser });
  } catch (err) {
    res.status(500).json({ error: 'Failed to signup user' });
  }
});

// Save Item Route (added in this implementation)
router.post('/save-item', async (req, res) => {
  const { userId, title, description, image } = req.body;

  if (!userId || !title || !description || !image) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const savedItem = new SavedItemsModel({ userId, title, description, image });
    await savedItem.save();

    res.status(201).json({ message: 'Item saved successfully', savedItem });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save item' });
  }
});

// Get Saved Items Route (added in this implementation)
router.get('/get-saved-items/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const savedItems = await SavedItemsModel.find({ userId });
    res.status(200).json({ savedItems });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve saved items' });
  }
});

// Delete Saved Item Route (added in this implementation)
router.delete('/delete-saved-item/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await SavedItemsModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Existing Route: Random Tech Entity Retrieval
router.get('/random-tech', async (req, res) => {
  try {
    const entities = await TechEntity.find();
    const randomIndex = Math.floor(Math.random() * entities.length);
    res.status(200).json(entities[randomIndex]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve random tech entity' });
  }
});

// Existing Route: Save Randomized Entity
router.post('/save-random', async (req, res) => {
  const { userId, techId } = req.body;

  try {
    const techEntity = await TechEntity.findById(techId);
    if (!techEntity) {
      return res.status(404).json({ error: 'Tech entity not found' });
    }

    const savedEntity = new SavedEntity({
      userId,
      techId,
      title: techEntity.title,
      description: techEntity.description,
      image: techEntity.image,
    });
    await savedEntity.save();

    res.status(201).json({ message: 'Entity saved successfully', savedEntity });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save random entity' });
  }
});

// Existing Route: Account Creation
router.post('/create-account', async (req, res) => {
  const { username, email } = req.body;

  try {
    const account = new Account({ username, email });
    await account.save();
    res.status(201).json({ message: 'Account created successfully', account });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create account' });
  }
});

// Existing Route: Upload a File
router.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

module.exports = router;
