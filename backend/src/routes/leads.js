// backend/src/routes/leads.js - Leads Management Routes
const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const GroqService = require('../services/groq');
const { mockLeads } = require('../data/mockLeads');

// Initialize GroqService properly with 'new'
const groqService = new GroqService();

// GET /api/leads - Get all leads
router.get('/', async (req, res) => {
  try {
    logger.info('GET /api/leads - Fetching all leads');
    
    // Return mock leads data
    res.json({
      success: true,
      count: mockLeads.length,
      data: mockLeads
    });
    
  } catch (error) {
    logger.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leads',
      message: error.message
    });
  }
});

// POST /api/leads - Create new lead
router.post('/', async (req, res) => {
  try {
    const leadData = req.body;
    logger.info('POST /api/leads - Creating new lead:', leadData);
    
    // Score the lead using AI
    const aiScore = await groqService.scoreLeadWithAI(leadData);
    
    const newLead = {
      id: `lead-${Date.now()}`,
      ...leadData,
      score: aiScore.score || 50,
      priority: aiScore.priority || 'Medium',
      status: 'new',
      createdAt: new Date().toISOString(),
      aiInsights: aiScore
    };
    
    mockLeads.push(newLead);
    
    res.status(201).json({
      success: true,
      data: newLead
    });
    
  } catch (error) {
    logger.error('Error creating lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create lead',
      message: error.message
    });
  }
});

// GET /api/leads/:id - Get single lead
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const lead = mockLeads.find(l => l.id === id);
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }
    
    res.json({
      success: true,
      data: lead
    });
    
  } catch (error) {
    logger.error('Error fetching lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lead',
      message: error.message
    });
  }
});

// POST /api/leads/:id/score - Score a lead with AI
router.post('/:id/score', async (req, res) => {
  try {
    const { id } = req.params;
    const lead = mockLeads.find(l => l.id === id);
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }
    
    const aiScore = await groqService.scoreLeadWithAI(lead);
    
    // Update lead with new score
    lead.score = aiScore.score;
    lead.priority = aiScore.priority;
    lead.aiInsights = aiScore;
    lead.lastScoredAt = new Date().toISOString();
    
    res.json({
      success: true,
      data: {
        leadId: id,
        score: aiScore
      }
    });
    
  } catch (error) {
    logger.error('Error scoring lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to score lead',
      message: error.message
    });
  }
});

// POST /api/leads/:id/process - Process a lead (qualify/disqualify)
router.post('/:id/process', async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;
    
    const lead = mockLeads.find(l => l.id === id);
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }
    
    if (action === 'qualify') {
      lead.status = 'qualified';
      lead.qualifiedAt = new Date().toISOString();
    } else if (action === 'disqualify') {
      lead.status = 'disqualified';
      lead.disqualifiedAt = new Date().toISOString();
    }
    
    res.json({
      success: true,
      data: lead
    });
    
  } catch (error) {
    logger.error('Error processing lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process lead',
      message: error.message
    });
  }
});

module.exports = router;