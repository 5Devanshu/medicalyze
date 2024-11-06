const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config(); // To load environment variables like DB_URI

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// MongoDB connection (you can replace this with your own MongoDB URI)
mongoose.connect(process.env.DB_URI || 'mongodb://localhost:27017/yourdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Use the routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
