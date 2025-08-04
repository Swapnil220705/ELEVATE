import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import fs from 'fs';

// Check if .env file exists
console.log('📁 Checking .env file...');
try {
  const envContent = fs.readFileSync('.env', 'utf8');
  console.log('✅ .env file found, content length:', envContent.length);
  console.log('📄 First few lines:', envContent.split('\n').slice(0, 3));
} catch (error) {
  console.log('❌ .env file not found:', error.message);
}

// Load environment variables
const result = dotenv.config();
console.log('🔧 dotenv result:', result.error ? result.error.message : 'Success');

// Debug environment variables
console.log('🔍 Environment Debug:');
console.log('EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET (hidden)' : 'NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV || 'NOT SET');

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
import memberRoutes from './routes/members.js';
import newsletterRoutes from './routes/newsletter.js';
import contactRoutes from './routes/contact.js';
import eventRoutes from './routes/events.js';

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.'
// });
// app.use(limiter);

// // Stricter rate limiting for form submissions
// const formLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 hour
//   max: 5, // limit each IP to 5 form submissions per hour
//   message: 'Too many form submissions, please try again later.'
// });

// Smart rate limiting based on environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// General rate limiting
const limiter = rateLimit({
  windowMs: isDevelopment ? 5 * 60 * 1000 : 15 * 60 * 1000, // 5 min dev, 15 min prod
  max: isDevelopment ? 1000 : 100, // 1000 dev, 100 prod
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: isDevelopment ? 5 : 15
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Form rate limiting
const formLimiter = rateLimit({
  windowMs: isDevelopment ? 10 * 60 * 1000 : 60 * 60 * 1000, // 10 min dev, 1 hour prod
  max: isDevelopment ? 50 : 5, // 50 dev, 5 prod
  message: {
    error: 'Too many form submissions, please try again later.',
    retryAfter: isDevelopment ? 10 : 60
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting
app.use(limiter);

// Routes with form rate limiting
app.use('/api/members', formLimiter, memberRoutes);
app.use('/api/newsletter', formLimiter, newsletterRoutes);
app.use('/api/contact', formLimiter, contactRoutes);
app.use('/api/events', eventRoutes); // No form limiting for events

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/elevate-dev-club', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/members', formLimiter, memberRoutes);
app.use('/api/newsletter', formLimiter, newsletterRoutes);
app.use('/api/contact', formLimiter, contactRoutes);
app.use('/api/events', eventRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler - Compatible with both Express 4.x and 5.x
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Fixed: Use export default instead of module.exports for ES modules
export default app;