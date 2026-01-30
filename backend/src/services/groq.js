// src/services/groq.js - Groq + Llama Integration Service
const Groq = require('groq-sdk');
const logger = require('../utils/logger');

class GroqService {
  constructor() {
    this.client = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });
    
    // Model configuration
    this.models = {
      fast: 'llama-3.1-8b-instant',      // Fast responses
      balanced: 'llama-3.1-70b-versatile', // Balanced performance
      powerful: 'llama-3.1-405b-reasoning' // Most powerful (if available)
    };
    
    this.defaultModel = this.models.balanced;
    this.requestCount = 0;
    this.averageResponseTime = 0;
  }

  async chat(message, options = {}) {
    const startTime = Date.now();
    
    try {
      const model = options.model || this.defaultModel;
      const temperature = options.temperature || 0.7;
      const maxTokens = options.maxTokens || 1024;
      
      logger.info(`🧠 Groq request to ${model}: ${message.substring(0, 100)}...`);
      
      const chatCompletion = await this.client.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an expert autonomous revenue operations agent. Provide accurate, actionable insights that maximize revenue and efficiency. Always respond in the requested format."
          },
          {
            role: "user",
            content: message
          }
        ],
        model: model,
        temperature: temperature,
        max_tokens: maxTokens,
        stream: false
      });

      const response = chatCompletion.choices[0]?.message?.content;
      const responseTime = Date.now() - startTime;
      
      this.updateMetrics(responseTime);
      
      logger.info(`✅ Groq response received in ${responseTime}ms`);
      
      return response;
      
    } catch (error) {
      logger.error('❌ Groq API error:', error);
      throw new Error(`Groq API failed: ${error.message}`);
    }
  }

  async scoreLeadWithAI(leadData) {
    const prompt = `Analyze this lead for RevenueFlow and provide a detailed scoring analysis:

Lead Information:
- Company: ${leadData.company || 'Unknown'}
- Contact: ${leadData.email}
- Title: ${leadData.title || 'Unknown'}
- Industry: ${leadData.industry || 'Unknown'}
- Company Size: ${leadData.companySize || 'Unknown'}
- Source: ${leadData.source || 'Unknown'}
- Message: ${leadData.message || 'No message'}
- Phone: ${leadData.phone || 'Not provided'}
- Website: ${leadData.website || 'Not provided'}

Provide a JSON response with:
{
  "score": 0-100,
  "priority": "Low|Medium|High|Critical",
  "reasoning": "Detailed explanation of score",
  "strengths": ["list of positive factors"],
  "concerns": ["list of potential issues"],
  "recommendedAction": "next best action",
  "timeframe": "response timeframe",
  "estimatedDealSize": "dollar amount",
  "conversionProbability": 0-100,
  "salesRepType": "type of rep needed",
  "followUpStrategy": "recommended approach"
}

Consider: company size, industry fit, message quality, contact seniority, lead source quality.`;

    try {
      const response = await this.chat(prompt, { model: this.models.balanced });
      return JSON.parse(response);
    } catch (error) {
      logger.error('Lead scoring AI failed:', error);
      return this.getFallbackScore(leadData);
    }
  }

  async predictDealOutcome(dealData) {
    const prompt = `Analyze this deal for outcome prediction:

Deal Information:
- Company: ${dealData.company}
- Deal Size: ${dealData.dealSize}
- Stage: ${dealData.stage}
- Days in Stage: ${dealData.daysInStage}
- Last Activity: ${dealData.lastActivity}
- Contact Level: ${dealData.contactLevel}
- Competitor: ${dealData.competitor || 'Unknown'}
- Budget Confirmed: ${dealData.budgetConfirmed}
- Decision Maker Met: ${dealData.decisionMakerMet}
- Proposal Sent: ${dealData.proposalSent}
- Demo Completed: ${dealData.demoCompleted}

Provide JSON response:
{
  "winProbability": 0-100,
  "riskLevel": "Low|Medium|High|Critical",
  "riskFactors": ["list of risks"],
  "strengths": ["positive indicators"],
  "recommendedActions": ["specific actions"],
  "timeToClose": "estimated days",
  "nextMilestone": "next important step",
  "urgency": "Low|Medium|High|Critical"
}`;

    try {
      const response = await this.chat(prompt, { model: this.models.balanced });
      return JSON.parse(response);
    } catch (error) {
      logger.error('Deal prediction AI failed:', error);
      return this.getFallbackDealPrediction(dealData);
    }
  }

  async forecastRevenue(pipelineData) {
    const prompt = `Analyze this pipeline data for revenue forecasting:

Pipeline Overview:
- Total Pipeline Value: ${pipelineData.totalValue}
- Number of Deals: ${pipelineData.dealCount}
- Average Deal Size: ${pipelineData.averageDealSize}
- Current Quarter Progress: ${pipelineData.quarterProgress}%
- Historical Close Rate: ${pipelineData.historicalCloseRate}%
- Trending Industries: ${pipelineData.trendingIndustries?.join(', ')}

Deals by Stage:
${pipelineData.dealsByStage?.map(stage => `- ${stage.name}: ${stage.count} deals, $${stage.value}`).join('\n')}

Provide JSON response:
{
  "forecastedRevenue": "dollar amount",
  "confidenceLevel": 0-100,
  "bestCase": "optimistic scenario",
  "worstCase": "pessimistic scenario",
  "keyRisks": ["potential issues"],
  "opportunities": ["growth opportunities"],
  "recommendations": ["actionable advice"],
  "monthlyBreakdown": {
    "month1": "amount",
    "month2": "amount", 
    "month3": "amount"
  }
}`;

    try {
      const response = await this.chat(prompt, { model: this.models.balanced });
      return JSON.parse(response);
    } catch (error) {
      logger.error('Revenue forecasting AI failed:', error);
      return this.getFallbackForecast(pipelineData);
    }
  }

  async generatePersonalizedMessage(leadData, context) {
    const prompt = `Generate a personalized outreach message for this lead:

Lead: ${leadData.email}
Company: ${leadData.company}
Title: ${leadData.title}
Industry: ${leadData.industry}
Source: ${leadData.source}
Their Message: ${leadData.message}

Context: ${context}

Create a professional, personalized message that:
1. References their company/industry
2. Addresses their specific needs
3. Highlights relevant RevenueFlow benefits
4. Includes a clear call to action
5. Feels personal, not templated

Keep it under 150 words and professional yet conversational.`;

    try {
      const response = await this.chat(prompt, { 
        model: this.models.fast,
        temperature: 0.8 
      });
      return response;
    } catch (error) {
      logger.error('Message generation failed:', error);
      return this.getFallbackMessage(leadData);
    }
  }

  async analyzeMarketTrends(industryData) {
    const prompt = `Analyze these market trends for revenue impact:

Industry Data:
${JSON.stringify(industryData, null, 2)}

Provide insights on:
1. Growth opportunities
2. Market risks
3. Competitive landscape
4. Revenue optimization strategies
5. Customer behavior trends

Format as JSON with actionable recommendations.`;

    try {
      const response = await this.chat(prompt, { model: this.models.balanced });
      return JSON.parse(response);
    } catch (error) {
      logger.error('Market analysis failed:', error);
      return { error: 'Analysis unavailable' };
    }
  }

  // Fallback methods for when AI fails
  getFallbackScore(leadData) {
    let score = 50; // baseline
    
    // Simple heuristic scoring
    if (leadData.company) score += 10;
    if (leadData.title?.toLowerCase().includes('director', 'manager', 'vp', 'ceo')) score += 15;
    if (leadData.companySize === 'large') score += 20;
    if (leadData.message?.length > 50) score += 10;
    
    return {
      score: Math.min(100, score),
      priority: score > 70 ? 'High' : score > 50 ? 'Medium' : 'Low',
      reasoning: 'Fallback scoring - AI unavailable',
      conversionProbability: Math.max(10, score - 20)
    };
  }

  getFallbackDealPrediction(dealData) {
    return {
      winProbability: 50,
      riskLevel: 'Medium',
      riskFactors: ['AI prediction unavailable'],
      recommendedActions: ['Manual review required'],
      timeToClose: '30 days',
      urgency: 'Medium'
    };
  }

  getFallbackForecast(pipelineData) {
    const conservativeRate = 0.25;
    const forecast = pipelineData.totalValue * conservativeRate;
    
    return {
      forecastedRevenue: forecast,
      confidenceLevel: 60,
      bestCase: forecast * 1.3,
      worstCase: forecast * 0.7,
      keyRisks: ['AI forecasting unavailable'],
      recommendations: ['Manual pipeline review needed']
    };
  }

  getFallbackMessage(leadData) {
    return `Hi ${leadData.firstName || 'there'},

Thank you for your interest in RevenueFlow. I noticed you're with ${leadData.company} - we help companies like yours automate their revenue operations and increase sales efficiency.

Would you be interested in a brief 15-minute demo to see how we can help ${leadData.company} streamline your sales process?

Best regards,
RevenueFlow Team`;
  }

  updateMetrics(responseTime) {
    this.requestCount++;
    this.averageResponseTime = 
      (this.averageResponseTime * (this.requestCount - 1) + responseTime) / this.requestCount;
  }

  getStats() {
    return {
      requestCount: this.requestCount,
      averageResponseTime: this.averageResponseTime,
      availableModels: this.models,
      currentModel: this.defaultModel
    };
  }

  // Health check
  async healthCheck() {
    try {
      const response = await this.chat('Health check: respond with "OK"', { 
        model: this.models.fast,
        maxTokens: 10 
      });
      return response?.includes('OK');
    } catch (error) {
      return false;
    }
  }
}

module.exports = GroqService;