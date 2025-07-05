// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Debugging: Verify environment variables
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Found' : 'Missing');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Found' : 'Missing');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  console.error('Full error object:', err);
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Document upload routes (to be implemented)
const documentRoutes = require('./routes/documentRoutes');
app.use('/api/docs', documentRoutes);

const signatureRoutes = require('./routes/signatureRoutes');
app.use('/api/signatures', signatureRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Signature App Backend is Running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});