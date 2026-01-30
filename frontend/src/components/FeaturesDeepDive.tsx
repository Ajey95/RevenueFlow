import React, { useState } from 'react';
import { Brain, BarChart3, Workflow, Users, Shield, Zap, ChevronDown, ChevronUp } from 'lucide-react';

const FeaturesDeepDive = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);

  const features = [
    {
      id: 'ai-scoring',
      icon: Brain,
      title: 'AI-Powered Lead Scoring',
      description: 'Real-time scoring algorithm with behavioral analysis and predictive modeling',
      details: 'Our machine learning algorithms analyze 50+ data points including behavioral patterns, company data, and historical outcomes to score leads with 94% accuracy.',
      integrations: ['Web forms', 'Social media', 'Events', 'Referrals', 'Email campaigns'],
      benefits: ['94% scoring accuracy', 'Real-time processing', 'Behavioral analysis', 'Predictive modeling']
    },
    {
      id: 'deal-tracking',
      icon: BarChart3,
      title: 'Automated Deal Tracking',
      description: 'Stage progression, risk identification, and coaching insights',
      details: 'Automatically track deal progression through your pipeline with AI-powered risk assessment and actionable coaching recommendations for sales teams.',
      integrations: ['CRM systems', 'Communication tools', 'Calendar apps', 'Email platforms'],
      benefits: ['Automated stage updates', 'Risk identification', 'Coaching insights', 'Performance analytics']
    },
    {
      id: 'forecasting',
      icon: Workflow,
      title: 'Revenue Forecasting',
      description: '95% accuracy with trend analysis and scenario planning',
      details: 'Advanced forecasting engine that combines historical data, market trends, and pipeline health to deliver highly accurate revenue predictions.',
      integrations: ['Historical data', 'Market indicators', 'Pipeline data', 'External APIs'],
      benefits: ['95% accuracy', 'Trend analysis', 'Scenario planning', 'Confidence intervals']
    },
    {
      id: 'automation',
      icon: Users,
      title: 'Workflow Automation',
      description: 'Drag-and-drop interface with conditional logic and parallel processing',
      details: 'Build complex automation workflows without code using our visual builder. Set up conditional logic, parallel processing, and multi-step sequences.',
      integrations: ['20+ business tools', 'Custom APIs', 'Webhooks', 'Third-party apps'],
      benefits: ['Visual workflow builder', 'Conditional logic', 'Parallel processing', 'No-code setup']
    },
    {
      id: 'reporting',
      icon: Shield,
      title: 'Executive Reporting',
      description: 'Real-time metrics with automated reports and drill-down capabilities',
      details: 'Executive dashboards with real-time metrics, automated report generation, and deep-dive capabilities for detailed analysis.',
      integrations: ['All data sources', 'BI tools', 'Presentation tools', 'Mobile apps'],
      benefits: ['Real-time dashboards', 'Automated reports', 'Drill-down analysis', 'Mobile access']
    },
    {
      id: 'sync',
      icon: Zap,
      title: 'Cross-Platform Sync',
      description: 'Real-time synchronization with intelligent conflict resolution',
      details: 'Seamless data synchronization across all your business tools with intelligent conflict resolution and data consistency guarantees.',
      integrations: ['CRM systems', 'Marketing automation', 'Customer success tools', 'Analytics platforms'],
      benefits: ['Real-time sync', 'Conflict resolution', 'Data consistency', '99.9% uptime']
    }
  ];

  const toggleFeature = (featureId) => {
    setExpandedFeature(expandedFeature === featureId ? null : featureId);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Every Feature Built for
            <span className="block text-cyan-500">Revenue Growth</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover the comprehensive suite of AI-powered features that transform how revenue teams operate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`bg-slate-50 rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer ${
                expandedFeature === feature.id
                  ? 'border-cyan-500 bg-cyan-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => toggleFeature(feature.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    expandedFeature === feature.id ? 'bg-cyan-500' : 'bg-slate-200'
                  }`}>
                    <feature.icon className={`w-6 h-6 ${
                      expandedFeature === feature.id ? 'text-white' : 'text-slate-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 mb-3">
                      {feature.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex-shrink-0 ml-4">
                  {expandedFeature === feature.id ? (
                    <ChevronUp className="w-5 h-5 text-cyan-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              {expandedFeature === feature.id && (
                <div className="mt-6 space-y-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">How it works</h4>
                    <p className="text-slate-600 text-sm">{feature.details}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900 mb-2">Key Benefits</h4>
                      <ul className="space-y-1">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center text-sm text-slate-600">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900 mb-2">Integrations</h4>
                      <ul className="space-y-1">
                        {feature.integrations.map((integration, integrationIndex) => (
                          <li key={integrationIndex} className="flex items-center text-sm text-slate-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            {integration}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to experience the full power of RevenueFlow?
            </h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-6">
              See how all these features work together to create a seamless, intelligent revenue operations system.
            </p>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesDeepDive;