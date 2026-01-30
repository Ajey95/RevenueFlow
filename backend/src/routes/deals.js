// backend/src/routes/deals.js - Deal Management API Routes
const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const mockDeals = require('../data/mockDeals');

// GET /api/deals - Get all deals
router.get('/', async (req, res) => {
  try {
    const { stage, riskLevel, page = 1, limit = 10 } = req.query;
    
    let filteredDeals = [...mockDeals];

    if (stage) {
      filteredDeals = filteredDeals.filter(deal => deal.stage === stage);
    }
    if (riskLevel) {
      filteredDeals = filteredDeals.filter(deal => deal.aiAnalysis.riskLevel === riskLevel);
    }

    const startIndex = (page - 1) * limit;
    const paginatedDeals = filteredDeals.slice(startIndex, startIndex + parseInt(limit));

    res.json({
      success: true,
      data: paginatedDeals,
      analytics: {
        total: filteredDeals.length,
        totalValue: filteredDeals.reduce((sum, deal) => sum + deal.value, 0),
        averageProbability: Math.round(filteredDeals.reduce((sum, deal) => sum + deal.probability, 0) / filteredDeals.length) || 0,
        atRisk: filteredDeals.filter(d => ['High', 'Critical'].includes(d.aiAnalysis.riskLevel)).length
      }
    });

  } catch (error) {
    logger.error('Error fetching deals:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch deals' });
  }
});

// GET /api/deals/:id - Get specific deal
router.get('/:id', async (req, res) => {
  try {
    const dealId = parseInt(req.params.id);
    const deal = mockDeals.find(d => d.id === dealId);

    if (!deal) {
      return res.status(404).json({ 
        success: false, 
        error: 'Deal not found' 
      });
    }

    res.json({
      success: true,
      data: deal
    });

  } catch (error) {
    logger.error('Error fetching deal:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch deal' });
  }
});

// POST /api/deals/:id/analyze - Analyze deal with AI
router.post('/:id/analyze', async (req, res) => {
  try {
    const dealId = parseInt(req.params.id);
    const deal = mockDeals.find(d => d.id === dealId);

    if (!deal) {
      return res.status(404).json({ 
        success: false, 
        error: 'Deal not found' 
      });
    }

    logger.info(`🔍 AI analyzing deal: ${deal.company}`);

    // Trigger AI analysis through agent orchestrator
    if (global.agentOrchestrator) {
      const analysis = await global.agentOrchestrator.processDeal(deal);
      
      res.json({
        success: true,
        data: {
          dealId: dealId,
          analysis: analysis,
          timestamp: new Date().toISOString()
        }
      });
    } else {
      res.status(503).json({ 
        success: false, 
        error: 'Agent orchestrator not available' 
      });
    }

  } catch (error) {
    logger.error('Error analyzing deal:', error);
    res.status(500).json({ success: false, error: 'Failed to analyze deal' });
  }
});

module.exports = router;