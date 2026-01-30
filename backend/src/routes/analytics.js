// backend/src/routes/analytics.js - Analytics & Dashboard API Routes
const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const mockRevenue = require('../data/mockRevenue');
const { mockLeads } = require('../data/mockLeads');
const mockDeals = require('../data/mockDeals');

// GET /api/analytics/dashboard - Main analytics dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const dashboard = {
      overview: {
        totalRevenue: mockRevenue.currentQuarter.actual,
        revenueTarget: mockRevenue.currentQuarter.target,
        revenueProgress: Math.round((mockRevenue.currentQuarter.actual / mockRevenue.currentQuarter.target) * 100),
        totalLeads: mockLeads.length,
        totalDeals: mockDeals.length,
        averageDealSize: Math.round(mockDeals.reduce((sum, deal) => sum + deal.value, 0) / mockDeals.length),
        conversionRate: mockRevenue.metrics.conversionRates.overallLeadToWon
      },
      
      leadMetrics: {
        total: mockLeads.length,
        newToday: mockLeads.filter(l => 
          new Date(l.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)
        ).length,
        highPriority: mockLeads.filter(l => l.priority === 'High').length,
        averageScore: Math.round(mockLeads.reduce((sum, l) => sum + l.score, 0) / mockLeads.length)
      },

      dealMetrics: {
        total: mockDeals.length,
        totalValue: mockDeals.reduce((sum, deal) => sum + deal.value, 0),
        averageValue: Math.round(mockDeals.reduce((sum, deal) => sum + deal.value, 0) / mockDeals.length),
        averageProbability: Math.round(mockDeals.reduce((sum, deal) => sum + deal.probability, 0) / mockDeals.length)
      },

      agentMetrics: {
        leadAgent: { status: 'active', processed: 247, accuracy: '94%' },
        dealAgent: { status: 'active', analyzed: 89, risksPrevented: 12 },
        revenueAgent: { status: 'active', forecastsGenerated: 23, accuracy: '95%' }
      }
    };

    res.json({
      success: true,
      data: dashboard,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error fetching dashboard analytics:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch dashboard data' });
  }
});

// GET /api/analytics/forecast - Revenue forecasting data
router.get('/forecast', async (req, res) => {
  try {
    const forecastData = {
      current: {
        period: 'Q4 2024',
        actual: mockRevenue.currentQuarter.actual,
        target: mockRevenue.currentQuarter.target,
        projected: mockRevenue.currentQuarter.projected,
        confidence: 87
      },
      scenarios: {
        conservative: mockRevenue.forecast.nextQuarter.conservative,
        likely: mockRevenue.forecast.nextQuarter.likely,
        optimistic: mockRevenue.forecast.nextQuarter.optimistic
      }
    };

    res.json({
      success: true,
      data: forecastData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error fetching forecast data:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch forecast data' });
  }
});

module.exports = router;