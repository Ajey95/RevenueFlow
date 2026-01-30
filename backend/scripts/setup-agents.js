// backend/scripts/setup-agents.js - Agent Initialization Script
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const AutonomousAgentOrchestrator = require('../src/agents/orchestrator');
const logger = require('../src/utils/logger');

async function setupAgents() {
  console.log('🤖 Setting up autonomous agents...');

  try {
    // Initialize orchestrator
    const orchestrator = new AutonomousAgentOrchestrator();
    
    console.log('📋 Initializing agent orchestrator...');
    const success = await orchestrator.initialize();
    
    if (success) {
      console.log('✅ All agents initialized successfully!');
      
      // Display agent status
      const status = orchestrator.getStatus();
      console.log('\n📊 Agent Status:');
      console.log(`- Active Agents: ${status.activeAgents}`);
      console.log(`- Orchestrator Running: ${status.isRunning}`);
      console.log(`- Total Tasks: ${status.totalTasks}`);
      
      // Test agent communication
      console.log('\n🔄 Testing agent communication...');
      await testAgentCommunication(orchestrator);
      
    } else {
      throw new Error('Agent initialization failed');
    }

  } catch (error) {
    console.error('❌ Agent setup failed:', error);
    process.exit(1);
  }
}

async function testAgentCommunication(orchestrator) {
  try {
    // Test lead processing
    const testLead = {
      id: 'test-001',
      email: 'test@example.com',
      company: 'Test Corp',
      title: 'CEO',
      industry: 'Technology'
    };

    console.log('📝 Testing lead processing...');
    const result = await orchestrator.processLead(testLead);
    
    if (result.success) {
      console.log(`✅ Lead processed with score: ${result.score}`);
    } else {
      console.log('⚠️ Lead processing test failed');
    }

  } catch (error) {
    console.log('⚠️ Agent communication test failed:', error.message);
  }
}

if (require.main === module) {
  setupAgents();
}

module.exports = { setupAgents };