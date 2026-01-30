// backend/src/routes/agents.js - Agent Management API Routes
const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

// GET /api/agents/status - Get all agent statuses
router.get('/status', async (req, res) => {
  try {
    if (!global.agentOrchestrator) {
      return res.status(503).json({
        success: false,
        error: 'Agent orchestrator not initialized',
        agents: {
          leadAgent: { status: 'offline' },
          dealAgent: { status: 'offline' },
          revenueAgent: { status: 'offline' }
        }
      });
    }

    const status = global.agentOrchestrator.getStatus();
    const agentStatuses = await global.agentOrchestrator.getAllAgentStatuses();

    res.json({
      success: true,
      orchestrator: {
        isRunning: status.isRunning,
        uptime: Math.round(status.uptime / 1000 / 60), // minutes
        totalTasks: status.totalTasks,
        completedTasks: status.completedTasks,
        successRate: status.successRate,
        activeAgents: status.activeAgents
      },
      agents: {
        leadAgent: {
          status: agentStatuses.leadAgent?.isRunning ? 'active' : 'offline',
          processedLeads: agentStatuses.leadAgent?.processedLeads || 0,
          averageProcessingTime: agentStatuses.leadAgent?.averageProcessingTime || 0,
          accuracy: agentStatuses.leadAgent?.accuracy || 0,
          efficiency: agentStatuses.leadAgent?.efficiency || 0
        },
        dealAgent: {
          status: agentStatuses.dealAgent?.isRunning ? 'active' : 'offline',
          analyzedDeals: agentStatuses.dealAgent?.analyzedDeals || 0,
          risksPrevented: agentStatuses.dealAgent?.risksPrevented || 0,
          averageAnalysisTime: agentStatuses.dealAgent?.averageAnalysisTime || 0,
          dealsMonitored: agentStatuses.dealAgent?.dealsMonitored || 0
        },
        revenueAgent: {
          status: agentStatuses.revenueAgent?.isRunning ? 'active' : 'offline',
          forecastsGenerated: agentStatuses.revenueAgent?.forecastsGenerated || 0,
          forecastAccuracy: agentStatuses.revenueAgent?.forecastAccuracy || 0,
          optimizationsFound: agentStatuses.revenueAgent?.optimizationsFound || 0,
          currentQuarter: agentStatuses.revenueAgent?.currentQuarter || 0
        }
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error fetching agent status:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch agent status' });
  }
});

// GET /api/agents/activity - Get real-time agent activity feed
router.get('/activity', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    // Get activity feed from orchestrator
    const activities = global.agentOrchestrator ? 
      global.agentOrchestrator.getActivityFeed() : [];

    // Add some mock real-time activities for demo
    const mockActivities = [
      {
        timestamp: new Date().toISOString(),
        agent: 'lead-agent',
        activity: 'New lead scored and routed',
        details: 'enterprise@newcompany.com - Score: 89/100',
        type: 'lead_processed',
        priority: 'high'
      },
      {
        timestamp: new Date(Date.now() - 15000).toISOString(),
        agent: 'deal-agent',
        activity: 'Deal risk assessment completed',
        details: 'TechCorp deal - Medium risk identified',
        type: 'deal_analyzed',
        priority: 'medium'
      },
      {
        timestamp: new Date(Date.now() - 45000).toISOString(),
        agent: 'revenue-agent',
        activity: 'Revenue forecast updated',
        details: 'Q4 forecast: $2.4M (+3%)',
        type: 'forecast_updated',
        priority: 'medium'
      },
      {
        timestamp: new Date(Date.now() - 90000).toISOString(),
        agent: 'lead-agent',
        activity: 'Autonomous follow-up sent',
        details: 'StartupXYZ - Personalized email dispatched',
        type: 'action_executed',
        priority: 'low'
      },
      {
        timestamp: new Date(Date.now() - 120000).toISOString(),
        agent: 'deal-agent',
        activity: 'At-risk deal intervention',
        details: 'RetailChain deal - Manager notified',
        type: 'intervention_triggered',
        priority: 'high'
      }
    ];

    const combinedActivities = [...mockActivities, ...activities]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);

    res.json({
      success: true,
      data: combinedActivities,
      meta: {
        total: combinedActivities.length,
        activeAgents: global.agentOrchestrator ? 
          global.agentOrchestrator.getActiveAgentCount() : 0,
        lastUpdate: new Date().toISOString()
      }
    });

  } catch (error) {
    logger.error('Error fetching agent activity:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch agent activity' });
  }
});

// GET /api/agents/performance - Get agent performance metrics
router.get('/performance', async (req, res) => {
  try {
    const performance = global.agentOrchestrator ? 
      global.agentOrchestrator.getPerformanceMetrics() : null;

    if (!performance) {
      return res.status(503).json({
        success: false,
        error: 'Performance metrics unavailable'
      });
    }

    res.json({
      success: true,
      data: {
        orchestrator: {
          uptime: performance.orchestrator.uptime,
          totalTasks: performance.orchestrator.totalTasks,
          tasksPerHour: performance.orchestrator.tasksPerHour,
          successRate: performance.orchestrator.successRate,
          efficiency: 'Excellent'
        },
        agents: {
          leadAgent: {
            ...performance.leadAgent,
            status: 'Optimal',
            recommendation: 'Performance excellent, no action needed'
          },
          dealAgent: {
            ...performance.dealAgent,
            status: 'Good',
            recommendation: 'Consider optimizing analysis speed'
          },
          revenueAgent: {
            ...performance.revenueAgent,
            status: 'Excellent',
            recommendation: 'Forecast accuracy above target'
          }
        },
        summary: {
          overallHealth: 'Excellent',
          totalProcessed: (performance.leadAgent?.processedLeads || 0) + 
                         (performance.dealAgent?.analyzedDeals || 0) + 
                         (performance.revenueAgent?.forecastsGenerated || 0),
          averageResponseTime: '2.1s',
          systemEfficiency: '94%'
        }
      }
    });

  } catch (error) {
    logger.error('Error fetching agent performance:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch performance metrics' });
  }
});

// POST /api/agents/restart - Restart specific agent or all agents
router.post('/restart', async (req, res) => {
  try {
    const { agent } = req.body; // 'lead', 'deal', 'revenue', or 'all'

    if (!global.agentOrchestrator) {
      return res.status(503).json({
        success: false,
        error: 'Agent orchestrator not available'
      });
    }

    logger.info(`🔄 Restart request for: ${agent || 'all'}`);

    let result = {};

    if (agent === 'all' || !agent) {
      // Restart all agents
      await global.agentOrchestrator.stopAllAgents();
      await global.agentOrchestrator.initialize();
      result = { restarted: ['lead', 'deal', 'revenue'] };
    } else {
      // Restart specific agent
      await global.agentOrchestrator.restartAgent(agent + 'Agent');
      result = { restarted: [agent] };
    }

    res.json({
      success: true,
      message: 'Agent(s) restarted successfully',
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error restarting agents:', error);
    res.status(500).json({ success: false, error: 'Failed to restart agents' });
  }
});

// POST /api/agents/command - Send command to specific agent
router.post('/command', async (req, res) => {
  try {
    const { agent, command, data } = req.body;

    if (!global.agentOrchestrator) {
      return res.status(503).json({
        success: false,
        error: 'Agent orchestrator not available'
      });
    }

    logger.info(`📤 Sending command '${command}' to ${agent} agent`);

    let result = {};

    switch (agent) {
      case 'lead':
        if (command === 'process_lead') {
          result = await global.agentOrchestrator.processLead(data);
        }
        break;
      case 'deal':
        if (command === 'analyze_deal') {
          result = await global.agentOrchestrator.processDeal(data);
        }
        break;
      case 'revenue':
        if (command === 'generate_forecast') {
          result = await global.agentOrchestrator.generateForecast(data);
        }
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid agent specified'
        });
    }

    res.json({
      success: true,
      message: `Command '${command}' executed successfully`,
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error executing agent command:', error);
    res.status(500).json({ success: false, error: 'Failed to execute command' });
  }
});

// GET /api/agents/health - Health check for all agents
router.get('/health', async (req, res) => {
  try {
    const health = {
      orchestrator: false,
      leadAgent: false,
      dealAgent: false,
      revenueAgent: false,
      overall: false
    };

    if (global.agentOrchestrator) {
      const status = global.agentOrchestrator.getStatus();
      health.orchestrator = status.isRunning;
      
      const agentStatuses = await global.agentOrchestrator.getAllAgentStatuses();
      health.leadAgent = agentStatuses.leadAgent?.isRunning || false;
      health.dealAgent = agentStatuses.dealAgent?.isRunning || false;
      health.revenueAgent = agentStatuses.revenueAgent?.isRunning || false;
    }

    health.overall = health.orchestrator && health.leadAgent && health.dealAgent && health.revenueAgent;

    const statusCode = health.overall ? 200 : 503;

    res.status(statusCode).json({
      success: health.overall,
      data: health,
      message: health.overall ? 'All agents healthy' : 'Some agents unhealthy',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error checking agent health:', error);
    res.status(500).json({ success: false, error: 'Health check failed' });
  }
});

module.exports = router;