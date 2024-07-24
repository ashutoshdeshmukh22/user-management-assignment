require('dotenv').config();

// Dependencies
const express = require('express');
const db = require('./config/db');

// importing Routes
const userRoutes = require('./routes/user.routes');

// Configuring PORT
const PORT = process.env.PORT || 3000;

// Connecting To Database
db.connect();

// Creating Express App Instance
const app = express();

app.use(express.json());

// Using The User Routes
app.use('/user', userRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: 'Internal Server Error, Please try Again' });
});

app.listen(PORT, () => {
  console.log(`App Listening on ${PORT}`);
});
