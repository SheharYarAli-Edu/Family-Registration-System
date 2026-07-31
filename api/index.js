const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/families', require('./routes/families'));
app.use('/api/users', require('./routes/users'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Family Registration API is running on Vercel!',
    status: '✅ Live'
  });
});

// Health check endpoint (Vercel ke liye)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Export for Vercel (IMPORTANT: No app.listen())
module.exports = app;