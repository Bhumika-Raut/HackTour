const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes'); 
const cors = require('cors'); 
const app = express();
const PORT = 3000;
let status = "disconnected";

app.use(cors()); 

dotenv.config();

const startConnect = async () => {
  try {
    await mongoose.connect(process.env.URI);
    status = "connected"; 
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:");
    status = "error";
  }
};

const stopConnect = async () => {
  await mongoose.disconnect();
  status = "disconnected"; 
  console.log("Disconnected from MongoDB");
};

app.use('/',routes);

app.get('/', (req, res) => {
  res.send(status);
});

app.listen(PORT, async () => {
  await startConnect(); 
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;