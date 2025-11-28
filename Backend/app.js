const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/database');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const googleAuthRoutes = require('./routes/googleAuth');
const aiRoutes = require('./routes/aiRoutes'); // ← Pastikan ini ada

// Passport config
require('./config/passport');

const app = express();

// Connect to database
connectDB();

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes - PASTIKAN URUTAN INI
app.use('/api/auth', authRoutes);
app.use('/api/auth', googleAuthRoutes);
app.use('/api/ai', aiRoutes); // ← AI routes harus setelah auth

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true,
    message: '🚀 Server is running with CORS!',
    timestamp: new Date().toISOString(),
    routes: ['/api/auth', '/api/ai']
  });
});

// Health check
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  const dbState = mongoose.connection.readyState;
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  
  res.json({
    success: true,
    server: 'running',
    database: states[dbState],
    environment: process.env.NODE_ENV,
    port: process.env.PORT
  });
});

// AI Health check (public endpoint)
app.get('/api/ai/health', (req, res) => {
  res.json({
    success: true,
    message: 'AI Prediction Service is running',
    timestamp: new Date().toISOString(),
    supported_coins: ['BTC', 'ETH', 'BNB', 'ADA', 'SOL']
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('='.repeat(50));
  console.log('🚀 CRYPTO PREDICTION APP BACKEND');
  console.log('='.repeat(50));
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌍 Host: 0.0.0.0 (accessible from all networks)`);
  console.log(`🗄️  Database: ${process.env.MONGODB_URI}`);
  console.log(`🔐 CORS: Enabled for localhost:5173`);
  console.log('='.repeat(50));
  console.log(`✅ Server: http://localhost:${PORT}`);
  console.log(`🌐 Network: http://127.0.0.1:${PORT}`);
  console.log(`🩺 Health: http://localhost:${PORT}/api/health`);
  console.log(`🤖 AI Health: http://localhost:${PORT}/api/ai/health`);
});