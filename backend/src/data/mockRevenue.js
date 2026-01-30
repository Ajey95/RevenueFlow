// backend/src/data/mockRevenue.js - Sample Revenue Data for Demo
const mockRevenue = {
  currentQuarter: {
    target: 2500000,
    actual: 1850000,
    projected: 2400000,
    percentage: 74,
    daysRemaining: 23,
    runRate: 80000 // per day
  },

  monthlyData: [
    {
      month: 'October 2024',
      target: 800000,
      actual: 750000,
      percentage: 94,
      deals: 15,
      avgDealSize: 50000
    },
    {
      month: 'November 2024',
      target: 850000,
      actual: 820000,
      percentage: 96,
      deals: 18,
      avgDealSize: 45556
    },
    {
      month: 'December 2024',
      target: 850000,
      actual: 280000,
      percentage: 33,
      deals: 6,
      avgDealSize: 46667
    }
  ],

  pipeline: {
    totalValue: 1250000,
    totalDeals: 28,
    averageDealSize: 44643,
    weightedValue: 750000,
    stages: [
      {
        name: 'Qualified',
        deals: 12,
        value: 540000,
        avgDaysInStage: 8,
        conversionRate: 65
      },
      {
        name: 'Demo',
        deals: 6,
        value: 270000,
        avgDaysInStage: 12,
        conversionRate: 75
      },
      {
        name: 'Proposal',
        deals: 5,
        value: 275000,
        avgDaysInStage: 15,
        conversionRate: 60
      },
      {
        name: 'Negotiation',
        deals: 3,
        value: 140000,
        avgDaysInStage: 8,
        conversionRate: 85
      },
      {
        name: 'Closed Won',
        deals: 2,
        value: 25000,
        avgDaysInStage: 0,
        conversionRate: 100
      }
    ]
  },

  forecast: {
    nextMonth: {
      conservative: 720000,
      likely: 850000,
      optimistic: 1020000,
      confidence: 78
    },
    nextQuarter: {
      conservative: 2100000,
      likely: 2400000,
      optimistic: 2800000,
      confidence: 72
    },
    factors: [
      'Strong pipeline in proposal stage',
      'Seasonal Q4 boost expected',
      'New product launch impact',
      'Competitive pressure in enterprise'
    ]
  },

  metrics: {
    conversionRates: {
      leadToQualified: 28,
      qualifiedToDemo: 65,
      demoToProposal: 75,
      proposalToClosedWon: 45,
      overallLeadToWon: 6.8
    },
    salesCycle: {
      averageDays: 45,
      byStage: {
        qualified: 8,
        demo: 12,
        proposal: 15,
        negotiation: 8,
        closedWon: 2
      }
    },
    teamPerformance: [
      {
        rep: 'Sarah Chen',
        target: 200000,
        actual: 180000,
        deals: 8,
        avgDealSize: 22500,
        conversionRate: 32
      },
      {
        rep: 'Mike Rodriguez',
        target: 180000,
        actual: 195000,
        deals: 12,
        avgDealSize: 16250,
        conversionRate: 28
      },
      {
        rep: 'Lisa Rodriguez',
        target: 220000,
        actual: 165000,
        deals: 5,
        avgDealSize: 33000,
        conversionRate: 22
      },
      {
        rep: 'David Kim',
        target: 160000,
        actual: 140000,
        deals: 9,
        avgDealSize: 15556,
        conversionRate: 35
      }
    ]
  },

  trends: {
    quarterOverQuarter: {
      revenue: 12,
      deals: 8,
      avgDealSize: 15,
      conversionRate: -2
    },
    monthOverMonth: {
      revenue: -18,
      deals: -25,
      avgDealSize: 8,
      conversionRate: 3
    }
  },

  opportunities: [
    {
      type: 'Deal Velocity',
      impact: 'High',
      description: 'Reduce average sales cycle by 10 days',
      potentialIncrease: 180000,
      recommendation: 'Implement automated follow-up sequences'
    },
    {
      type: 'Conversion Rate',
      impact: 'Medium',
      description: 'Improve lead qualification process',
      potentialIncrease: 120000,
      recommendation: 'Deploy AI-powered lead scoring'
    },
    {
      type: 'Deal Size',
      impact: 'High',
      description: 'Focus on enterprise opportunities',
      potentialIncrease: 250000,
      recommendation: 'Target larger accounts with expanded solutions'
    }
  ],

  risks: [
    {
      type: 'Pipeline Gap',
      severity: 'Medium',
      description: 'Low pipeline for Q1 2025',
      impact: -150000,
      mitigation: 'Increase lead generation activities'
    },
    {
      type: 'Competitive Pressure',
      severity: 'High',
      description: 'Increased competition in enterprise segment',
      impact: -200000,
      mitigation: 'Strengthen competitive positioning'
    }
  ],

  realTimeActivity: [
    {
      timestamp: new Date().toISOString(),
      type: 'deal_update',
      description: 'TechCorp deal moved to Negotiation stage',
      value: 75000,
      agent: 'deal-agent'
    },
    {
      timestamp: new Date(Date.now() - 300000).toISOString(),
      type: 'lead_scored',
      description: 'New lead scored: Enterprise Corp (92/100)',
      value: 150000,
      agent: 'lead-agent'
    },
    {
      timestamp: new Date(Date.now() - 600000).toISOString(),
      type: 'forecast_update',
      description: 'Q4 forecast updated: +5% increase',
      value: 120000,
      agent: 'revenue-agent'
    },
    {
      timestamp: new Date(Date.now() - 900000).toISOString(),
      type: 'risk_detected',
      description: 'RetailChain deal flagged as at-risk',
      value: -45000,
      agent: 'deal-agent'
    }
  ]
};

module.exports = mockRevenue;