// src/app.js - Main Express Application
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const leadsRoutes = require('./routes/leads');
const agentsRoutes = require('./routes/agents');
const analyticsRoutes = require('./routes/analytics');
const aiRoutes = require('./routes/ai');

// Import services
const AutonomousAgentOrchestrator = require('./agents/orchestrator');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000 // Increased limit for development
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    agents: global.agentOrchestrator ? global.agentOrchestrator.getStatus() : 'initializing'
  });
});

// API routes
app.use('/api/leads', leadsRoutes);
app.use('/api/agents', agentsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  logger.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Initialize autonomous agents
async function initializeAgents() {
  try {
    logger.info('🤖 Initializing Autonomous Agent Orchestrator...');
    global.agentOrchestrator = new AutonomousAgentOrchestrator();
    await global.agentOrchestrator.initialize();
    logger.info('✅ Autonomous agents are now running!');
  } catch (error) {
    logger.error('❌ Failed to initialize agents:', error);
  }
}

// Start server
app.listen(PORT, async () => {
  logger.info(`🚀 RevenueFlow Backend running on port ${PORT}`);
  logger.info(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Initialize autonomous agents after server starts
  await initializeAgents();
  
  logger.info('🎯 Ready for autonomous revenue operations!');
});

module.exports = app;
