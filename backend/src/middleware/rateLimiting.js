// backend/src/middleware/rateLimiting.js - Rate Limiting Middleware
const rateLimit = require('express-rate-limit');
const logger = require('../utils/logger');

// Standard rate limit
const standardLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests, please try again later'
  },
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      error: 'Too many requests, please try again later'
    });
  }
});

// Strict rate limit for AI endpoints
const aiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, // limit each IP to 20 AI requests per 5 minutes
  message: {
    success: false,
    error: 'AI rate limit exceeded, please try again later'
  }
});

// Auth rate limit
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 auth attempts per windowMs
  message: {
    success: false,
    error: 'Too many authentication attempts, please try again later'
  }
});

module.exports = {
  standardLimiter,
  aiLimiter,
  authLimiter
};