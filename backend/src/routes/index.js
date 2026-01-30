// backend/src/routes/index.js - Route Aggregator
const express = require('express');
const router = express.Router();

// Import all route modules
const leadsRoutes = require('./leads');
const dealsRoutes = require('./deals');
const agentsRoutes = require('./agents');
const aiRoutes = require('./ai');
const analyticsRoutes = require('./analytics');
const webhooksRoutes = require('./webhooks');

// Mount routes
router.use('/leads', leadsRoutes);
router.use('/deals', dealsRoutes);
router.use('/agents', agentsRoutes);
router.use('/ai', aiRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/webhooks', webhooksRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    name: 'RevenueFlow API',
    version: '1.0.0',
    description: 'Autonomous Revenue Operations API',
    endpoints: {
      leads: '/api/leads',
      deals: '/api/deals', 
      agents: '/api/agents',
      ai: '/api/ai',
      analytics: '/api/analytics',
      webhooks: '/api/webhooks'
    },
    status: 'operational',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;