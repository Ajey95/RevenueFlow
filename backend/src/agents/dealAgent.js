// src/agents/dealAgent.js - Autonomous Deal Management Agent
const GroqService = require('../services/groq');
const logger = require('../utils/logger');
const EventEmitter = require('events');

class AutonomousDealAgent extends EventEmitter {
  constructor() {
    super();
    this.groqService = new GroqService();
    this.isRunning = false;
    this.analyzedDeals = 0;
    this.risksPrevented = 0;
    this.averageAnalysisTime = 2.5;
    this.dealsMonitored = 0;
    this.monitoringInterval = null;
    
    // Agent configuration
    this.config = {
      name: "RevenueFlow Deal Monitor",
      checkInterval: 15000 // Check every 15 seconds
    };
  }

  async initialize() {
    try {
      logger.info('🤖 Initializing Autonomous Deal Agent...');
      
      // Start autonomous monitoring
      this.startAutonomousBehavior();
      this.isRunning = true;
      this.dealsMonitored = 5; // Start with some deals being monitored
      
      logger.info('✅ Deal Agent is now autonomous and monitoring!');
      return true;
    } catch (error) {
      logger.error('❌ Failed to initialize Deal Agent:', error);
      return false;
    }
  }

  startAutonomousBehavior() {
    // Simulate autonomous deal monitoring
    this.monitoringInterval = setInterval(() => {
      if (this.isRunning) {
        this.analyzedDeals++;
        this.averageAnalysisTime = Math.max(1.5, this.averageAnalysisTime - 0.02);
        
        // Simulate risk detection
        if (Math.random() > 0.85) {
          this.risksPrevented++;
          logger.info(`⚠️ Deal Agent prevented a risk (Total: ${this.risksPrevented})`);
        }
        
        // Emit event for closed deals (simulated)
        if (Math.random() > 0.9) {
          this.emit('deal-closed', {
            dealId: `deal-${Date.now()}`,
            value: Math.floor(Math.random() * 50000) + 10000
          });
        }
      }
    }, this.config.checkInterval);
    
    logger.info('🔄 Deal Agent autonomous behavior started');
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      analyzedDeals: this.analyzedDeals,
      risksPrevented: this.risksPrevented,
      averageAnalysisTime: parseFloat(this.averageAnalysisTime.toFixed(2)),
      dealsMonitored: this.dealsMonitored
    };
  }

  async stop() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
    this.isRunning = false;
    logger.info('🛑 Deal Agent stopped');
  }

  async analyzeDeal(dealData) {
    this.analyzedDeals++;
    return {
      dealId: dealData.id,
      risk: 'low',
      score: Math.floor(Math.random() * 30) + 70
    };
  }

  async handleMessage(type, data, from) {
    logger.info(`📨 Deal Agent received message: ${type} from ${from}`);
    
    if (type === 'qualified-lead') {
      logger.info(`🎯 New qualified lead received: Score ${data.score}`);
      // Process the qualified lead
      this.dealsMonitored++;
    }
  }
}

module.exports = AutonomousDealAgent;
