// backend/scripts/test-groq.js - Test Groq Connection
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const GroqService = require('../src/services/groq');

async function testGroqConnection() {
  console.log('🧠 Testing Groq API connection...');

  try {
    const groqService = new GroqService();
    
    // Test 1: Health check
    console.log('🔍 Performing health check...');
    const healthStatus = await groqService.healthCheck();
    
    if (healthStatus) {
      console.log('✅ Groq API is accessible');
    } else {
      console.log('❌ Groq API health check failed');
      return;
    }

    // Test 2: Simple chat
    console.log('💬 Testing simple chat...');
    const chatResponse = await groqService.chat('Hello, respond with "OK" if you can hear me');
    console.log('Response:', chatResponse);

    // Test 3: Lead scoring
    console.log('📊 Testing lead scoring...');
    const testLead = {
      email: 'ceo@bigtech.com',
      company: 'BigTech Inc',
      title: 'CEO',
      industry: 'Technology',
      companySize: 'large',
      message: 'Interested in enterprise AI solutions'
    };

    const scoringResult = await groqService.scoreLeadWithAI(testLead);
    console.log('Lead Scoring Result:');
    console.log(`- Score: ${scoringResult.score}/100`);
    console.log(`- Priority: ${scoringResult.priority}`);
    console.log(`- Reasoning: ${scoringResult.reasoning}`);

    // Test 4: Performance stats
    console.log('\n📈 Performance Stats:');
    const stats = groqService.getStats();
    console.log(`- Total Requests: ${stats.requestCount}`);
    console.log(`- Average Response Time: ${stats.averageResponseTime}ms`);

    console.log('\n✅ All Groq tests completed successfully!');

  } catch (error) {
    console.error('❌ Groq test failed:', error);
    
    if (error.message.includes('API key')) {
      console.log('\n💡 Make sure to set GROQ_API_KEY in your .env file');
      console.log('Get your API key from: https://console.groq.com');
    }
    
    process.exit(1);
  }
}

if (require.main === module) {
  testGroqConnection();
}

module.exports = { testGroqConnection };