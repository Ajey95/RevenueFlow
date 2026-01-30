// src/agents/orchestrator.js - Autonomous Agent Orchestrator
const AutonomousLeadAgent = require('./leadAgent');
const AutonomousDealAgent = require('./dealAgent');
const AutonomousRevenueAgent = require('./revenueAgent');
const logger = require('../utils/logger');

class AutonomousAgentOrchestrator {
  constructor() {
    this.agents = {};
    this.isRunning = false;
    this.startTime = null;
    this.stats = {
      totalTasks: 0,
      completedTasks: 0,
      failedTasks: 0,
      activeAgents: 0
    };
    
    // Agent communication channels
    this.messageQueue = [];
    this.agentNetwork = new Map();
  }

  async initialize() {
    try {
      logger.info('🚀 Initializing Autonomous Agent Orchestrator...');
      
      // Initialize individual agents
      await this.initializeLeadAgent();
      await this.initializeDealAgent();
      await this.initializeRevenueAgent();
      
      // Setup inter-agent communication
      await this.setupAgentNetwork();
      
      // Start orchestrator services
      await this.startOrchestrationServices();
      
      this.isRunning = true;
      this.startTime = new Date();
      
      logger.info('✅ All autonomous agents initialized and running!');
      logger.info(`📊 Active agents: ${this.getActiveAgentCount()}`);
      
      return true;
    } catch (error) {
      logger.error('❌ Failed to initialize agent orchestrator:', error);
      return false;
    }
  }

  async initializeLeadAgent() {
    try {
      logger.info('🤖 Initializing Lead Agent...');
      this.agents.leadAgent = new AutonomousLeadAgent();
      await this.agents.leadAgent.initialize();
      this.stats.activeAgents++;
      logger.info('✅ Lead Agent initialized');
    } catch (error) {
      logger.error('❌ Lead Agent initialization failed:', error);
      throw error;
    }
  }

  async initializeDealAgent() {
    try {
      logger.info('🤖 Initializing Deal Agent...');
      this.agents.dealAgent = new AutonomousDealAgent();
      await this.agents.dealAgent.initialize();
      this.stats.activeAgents++;
      logger.info('✅ Deal Agent initialized');
    } catch (error) {
      logger.error('❌ Deal Agent initialization failed:', error);
      throw error;
    }
  }

  async initializeRevenueAgent() {
    try {
      logger.info('🤖 Initializing Revenue Agent...');
      this.agents.revenueAgent = new AutonomousRevenueAgent();
      await this.agents.revenueAgent.initialize();
      this.stats.activeAgents++;
      logger.info('✅ Revenue Agent initialized');
    } catch (error) {
      logger.error('❌ Revenue Agent initialization failed:', error);
      throw error;
    }
  }

  async setupAgentNetwork() {
    logger.info('🌐 Setting up agent network communication...');
    
    // Register agents in network (only if they exist)
    if (this.agents.leadAgent) {
      this.agentNetwork.set('lead-agent', this.agents.leadAgent);
    }
    if (this.agents.dealAgent) {
      this.agentNetwork.set('deal-agent', this.agents.dealAgent);
    }
    if (this.agents.revenueAgent) {
      this.agentNetwork.set('revenue-agent', this.agents.revenueAgent);
    }
    
    // Setup message routing
    this.setupMessageRouting();
    
    logger.info('✅ Agent network established');
  }

  setupMessageRouting() {
    // Lead Agent → Deal Agent communication
    if (this.agents.leadAgent) {
      this.agents.leadAgent.on('lead-qualified', (leadData) => {
        this.stats.totalTasks++;
        this.routeMessage('lead-agent', 'deal-agent', 'new-qualified-lead', leadData);
        this.stats.completedTasks++;
      });
    }

    // Deal Agent → Revenue Agent communication
    if (this.agents.dealAgent) {
      this.agents.dealAgent.on('deal-closed', (dealData) => {
        this.stats.totalTasks++;
        this.routeMessage('deal-agent', 'revenue-agent', 'deal-closed', dealData);
        this.stats.completedTasks++;
      });
    }

    // Revenue Agent → All Agents communication
    if (this.agents.revenueAgent) {
      this.agents.revenueAgent.on('forecast-update', (forecast) => {
        this.stats.totalTasks++;
        this.broadcastMessage('revenue-agent', 'forecast-update', forecast);
        this.stats.completedTasks++;
      });
    }
  }

  async startOrchestrationServices() {
    // Health checks disabled - agents require uagents package
    // setInterval(() => {
    //   this.performHealthChecks();
    // }, 30000); // Every 30 seconds

    // Start performance monitoring
    setInterval(() => {
      this.monitorPerformance();
    }, 60000); // Every minute

    // Start task coordination
    setInterval(() => {
      this.coordinateTasks();
    }, 10000); // Every 10 seconds

    logger.info('🔄 Orchestration services started (health checks disabled)');
  }

  // Main processing methods
  async processLead(leadData) {
    try {
      this.stats.totalTasks++;
      logger.info(`📥 Orchestrating lead processing: ${leadData.email}`);

      // Route to lead agent (if available)
      if (this.agents.leadAgent) {
        const result = await this.agents.leadAgent.processLead(leadData);
        
        // If lead is qualified, notify deal agent
        if (result.score >= 70 && this.agents.dealAgent) {
          await this.notifyDealAgent('qualified-lead', {
            leadId: leadData.id,
            score: result.score,
            estimatedValue: result.estimatedValue || 25000
          });
        }

        // Update revenue projections
        if (this.agents.revenueAgent) {
          await this.notifyRevenueAgent('new-lead-processed', {
            leadId: leadData.id,
            score: result.score,
            estimatedValue: result.estimatedValue || 25000
          });
        }

        this.stats.completedTasks++;
        
        return {
          success: true,
          score: result.score,
          processingTime: result.processingTime
        };
      }
      
      this.stats.completedTasks++;
      return { success: true, score: 50 };
      
    } catch (error) {
      this.stats.failedTasks++;
      logger.error('❌ Lead processing orchestration failed:', error);
      throw error;
    }
  }

  async processDeal(dealData) {
    try {
      this.stats.totalTasks++;
      logger.info(`📊 Orchestrating deal processing: ${dealData.company}`);

      const result = await this.agents.dealAgent.processDeal(null, dealData);
      
      // Update revenue forecasts
      await this.notifyRevenueAgent('deal-update', {
        dealId: dealData.id,
        stage: dealData.stage,
        value: dealData.value,
        probability: result.winProbability
      });

      this.stats.completedTasks++;
      return result;
      
    } catch (error) {
      this.stats.failedTasks++;
      logger.error('❌ Deal processing orchestration failed:', error);
      throw error;
    }
  }

  async generateForecast(pipelineData) {
    try {
      this.stats.totalTasks++;
      logger.info('📈 Orchestrating revenue forecast generation...');

      const result = await this.agents.revenueAgent.generateForecast(null, pipelineData);
      
      // Share forecast with other agents
      await this.broadcastMessage('revenue-agent', 'new-forecast', result);

      this.stats.completedTasks++;
      return result;
      
    } catch (error) {
      this.stats.failedTasks++;
      logger.error('❌ Revenue forecast orchestration failed:', error);
      throw error;
    }
  }

  // Agent communication methods
  async routeMessage(from, to, type, data) {
    try {
      const targetAgent = this.agentNetwork.get(to);
      if (targetAgent) {
        await targetAgent.handleMessage(type, data, from);
        logger.info(`📤 Message routed: ${from} → ${to} (${type})`);
      } else {
        logger.warn(`⚠️ Target agent not found: ${to}`);
      }
    } catch (error) {
      logger.error('❌ Message routing failed:', error);
    }
  }

  async broadcastMessage(from, type, data) {
    logger.info(`📢 Broadcasting message: ${type} from ${from}`);
    
    for (const [agentId, agent] of this.agentNetwork.entries()) {
      if (agentId !== from) {
        try {
          await agent.handleMessage(type, data, from);
        } catch (error) {
          logger.error(`❌ Broadcast failed to ${agentId}:`, error);
        }
      }
    }
  }

  async notifyDealAgent(type, data) {
    if (this.agents.dealAgent) {
      await this.agents.dealAgent.handleMessage(type, data, 'orchestrator');
    }
  }

  async notifyRevenueAgent(type, data) {
    if (this.agents.revenueAgent) {
      await this.agents.revenueAgent.handleMessage(type, data, 'orchestrator');
    }
  }

  // Monitoring and maintenance
  async performHealthChecks() {
    logger.info('🔍 Performing agent health checks...');
    
    const healthStatus = {
      leadAgent: await this.checkAgentHealth('leadAgent'),
      dealAgent: await this.checkAgentHealth('dealAgent'),
      revenueAgent: await this.checkAgentHealth('revenueAgent')
    };

    // Restart failed agents
    for (const [agentName, isHealthy] of Object.entries(healthStatus)) {
      if (!isHealthy) {
        logger.warn(`⚠️ ${agentName} health check failed, attempting restart...`);
        await this.restartAgent(agentName);
      }
    }
  }

  async checkAgentHealth(agentName) {
    try {
      const agent = this.agents[agentName];
      if (!agent) return false;
      
      return agent.isRunning && typeof agent.getStatus === 'function';
    } catch (error) {
      logger.error(`❌ Health check failed for ${agentName}:`, error);
      return false;
    }
  }

  async restartAgent(agentName) {
    try {
      logger.info(`🔄 Restarting ${agentName}...`);
      
      // Stop the agent
      if (this.agents[agentName]) {
        await this.agents[agentName].stop();
      }
      
      // Reinitialize based on agent type
      switch (agentName) {
        case 'leadAgent':
          await this.initializeLeadAgent();
          break;
        case 'dealAgent':
          await this.initializeDealAgent();
          break;
        case 'revenueAgent':
          await this.initializeRevenueAgent();
          break;
      }
      
      logger.info(`✅ ${agentName} restarted successfully`);
      
    } catch (error) {
      logger.error(`❌ Failed to restart ${agentName}:`, error);
    }
  }

  monitorPerformance() {
    const uptime = this.startTime ? Date.now() - this.startTime.getTime() : 0;
    const uptimeMinutes = Math.floor(uptime / 60000);
    
    logger.info(`📊 Orchestrator Performance:
      Uptime: ${uptimeMinutes} minutes
      Total Tasks: ${this.stats.totalTasks}
      Completed: ${this.stats.completedTasks}
      Failed: ${this.stats.failedTasks}
      Success Rate: ${this.stats.totalTasks > 0 ? 
        ((this.stats.completedTasks / this.stats.totalTasks) * 100).toFixed(1) : 0}%
      Active Agents: ${this.stats.activeAgents}`);
  }

  async coordinateTasks() {
    // Process any queued messages
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      await this.processQueuedMessage(message);
    }
  }

  async processQueuedMessage(message) {
    try {
      const { to, type, data, from } = message;
      await this.routeMessage(from, to, type, data);
    } catch (error) {
      logger.error('❌ Queued message processing failed:', error);
    }
  }

  // Public API methods
  getStatus() {
    const uptime = this.startTime ? Date.now() - this.startTime.getTime() : 0;
    
    return {
      isRunning: this.isRunning,
      uptime: uptime,
      activeAgents: this.stats.activeAgents,
      totalTasks: this.stats.totalTasks,
      completedTasks: this.stats.completedTasks,
      failedTasks: this.stats.failedTasks,
      successRate: this.stats.totalTasks > 0 ? 
        ((this.stats.completedTasks / this.stats.totalTasks) * 100).toFixed(1) : 0,
      agents: {
        leadAgent: this.agents.leadAgent ? this.agents.leadAgent.getStatus() : null,
        dealAgent: this.agents.dealAgent ? this.agents.dealAgent.getStatus() : null,
        revenueAgent: this.agents.revenueAgent ? this.agents.revenueAgent.getStatus() : null
      }
    };
  }

  getActiveAgentCount() {
    return this.stats.activeAgents;
  }

  async getAllAgentStatuses() {
    const statuses = {};
    
    for (const [agentName, agent] of Object.entries(this.agents)) {
      try {
        statuses[agentName] = agent.getStatus();
      } catch (error) {
        statuses[agentName] = { error: error.message };
      }
    }
    
    return statuses;
  }

  async stopAllAgents() {
    logger.info('🛑 Stopping all autonomous agents...');
    
    for (const [agentName, agent] of Object.entries(this.agents)) {
      try {
        await agent.stop();
        logger.info(`✅ ${agentName} stopped`);
      } catch (error) {
        logger.error(`❌ Failed to stop ${agentName}:`, error);
      }
    }
    
    this.isRunning = false;
    this.stats.activeAgents = 0;
    
    logger.info('🏁 All agents stopped');
  }

  // Real-time activity feed
  getActivityFeed() {
    // This would return recent agent activities
    // For demo purposes, returning mock data
    return [
      {
        timestamp: new Date().toISOString(),
        agent: 'lead-agent',
        activity: 'New lead scored and routed',
        details: 'john@techcorp.com - Score: 87',
        type: 'lead_processed'
      },
      {
        timestamp: new Date(Date.now() - 30000).toISOString(),
        agent: 'deal-agent',
        activity: 'Deal risk assessment completed',
        details: 'TechCorp deal - Medium risk identified',
        type: 'deal_analyzed'
      },
      {
        timestamp: new Date(Date.now() - 60000).toISOString(),
        agent: 'revenue-agent',
        activity: 'Revenue forecast updated',
        details: 'Q1 forecast: $2.4M (+5%)',
        type: 'forecast_updated'
      }
    ];
  }

  // Agent performance metrics
  getPerformanceMetrics() {
    const uptime = this.startTime ? Date.now() - this.startTime.getTime() : 0;
    const uptimeHours = uptime / (1000 * 60 * 60);
    
    return {
      orchestrator: {
        uptime: Math.round(uptimeHours * 10) / 10,
        totalTasks: this.stats.totalTasks,
        tasksPerHour: uptimeHours > 0 ? Math.round(this.stats.totalTasks / uptimeHours) : 0,
        successRate: this.stats.totalTasks > 0 ? 
          ((this.stats.completedTasks / this.stats.totalTasks) * 100).toFixed(1) : 0
      },
      leadAgent: this.agents.leadAgent ? {
        processedLeads: this.agents.leadAgent.processedLeads || 0,
        averageProcessingTime: this.agents.leadAgent.averageProcessingTime || 0,
        accuracy: this.agents.leadAgent.accuracy || 0
      } : null,
      dealAgent: this.agents.dealAgent ? {
        analyzedDeals: this.agents.dealAgent.analyzedDeals || 0,
        risksPrevented: this.agents.dealAgent.risksPrevented || 0,
        averageAnalysisTime: this.agents.dealAgent.averageAnalysisTime || 0
      } : null,
      revenueAgent: this.agents.revenueAgent ? {
        forecastsGenerated: this.agents.revenueAgent.forecastsGenerated || 0,
        forecastAccuracy: this.agents.revenueAgent.forecastAccuracy || 0,
        optimizationsFound: this.agents.revenueAgent.optimizationsFound || 0
      } : null
    };
  }
}

module.exports = AutonomousAgentOrchestrator;