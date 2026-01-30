// backend/src/routes/webhooks.js - Webhook Endpoints for External Integrations
const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

// POST /api/webhooks/leads - Webhook for new leads from external sources
router.post('/leads', async (req, res) => {
  try {
    const leadData = req.body;
    const source = req.headers['x-source'] || 'webhook';

    logger.info(`📥 Webhook lead received from: ${source}`);

    // Process lead through autonomous system
    if (global.agentOrchestrator) {
      const result = await global.agentOrchestrator.processLead({
        ...leadData,
        source: source,
        createdAt: new Date().toISOString()
      });

      res.json({
        success: true,
        message: 'Lead processed autonomously',
        data: {
          score: result.score,
          priority: result.priority,
          processingTime: result.processingTime
        }
      });
    } else {
      res.status(503).json({
        success: false,
        error: 'Processing system unavailable'
      });
    }

  } catch (error) {
    logger.error('Webhook lead processing failed:', error);
    res.status(500).json({ success: false, error: 'Webhook processing failed' });
  }
});

// POST /api/webhooks/deals - Webhook for deal updates
router.post('/deals', async (req, res) => {
  try {
    const dealData = req.body;
    const source = req.headers['x-source'] || 'webhook';

    logger.info(`📊 Webhook deal update from: ${source}`);

    // Process deal update through autonomous system
    if (global.agentOrchestrator) {
      const result = await global.agentOrchestrator.processDeal(dealData);

      res.json({
        success: true,
        message: 'Deal update processed',
        data: result
      });
    } else {
      res.status(503).json({
        success: false,
        error: 'Processing system unavailable'
      });
    }

  } catch (error) {
    logger.error('Webhook deal processing failed:', error);
    res.status(500).json({ success: false, error: 'Webhook processing failed' });
  }
});

module.exports = router;