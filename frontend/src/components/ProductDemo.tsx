import React, { useState } from 'react';
import { Play, Users, BarChart3, Workflow, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

const ProductDemo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoTabs = [
    {
      id: 'lead-processing',
      title: 'Lead Processing Flow',
      icon: Users,
      content: {
        title: 'Automated Lead Processing',
        description: 'Watch as RevenueFlow automatically processes, scores, and routes leads in real-time',
        features: ['Instant lead scoring', 'Automatic data enrichment', 'Smart routing rules', 'Real-time notifications'],
        metrics: { processed: 127, accuracy: 94, avgTime: '2.3min' }
      }
    },
    {
      id: 'deal-intelligence',
      title: 'Deal Intelligence Dashboard',
      icon: BarChart3,
      content: {
        title: 'AI-Powered Deal Insights',
        description: 'Get instant visibility into deal health and predictive recommendations',
        features: ['Risk assessment', 'Next best actions', 'Competitive analysis', 'Closing probability'],
        metrics: { deals: 89, winRate: 67, avgDeal: '$47K' }
      }
    },
    {
      id: 'revenue-forecasting',
      title: 'Revenue Forecasting',
      icon: TrendingUp,
      content: {
        title: 'Predictive Revenue Analytics',
        description: 'AI-driven forecasting with 95% accuracy and scenario planning',
        features: ['Pipeline forecasting', 'Scenario modeling', 'Trend analysis', 'Revenue attribution'],
        metrics: { accuracy: 95, forecast: '$2.4M', confidence: 87 }
      }
    },
    {
      id: 'workflow-automation',
      title: 'Workflow Automation',
      icon: Workflow,
      content: {
        title: 'Visual Workflow Builder',
        description: 'Create complex automation workflows with drag-and-drop simplicity',
        features: ['Visual workflow builder', 'Conditional logic', 'Multi-step automation', 'Integration hub'],
        metrics: { workflows: 23, automated: 78, timeSaved: '15hrs' }
      }
    }
  ];

  const handleWatchDemo = () => {
    setIsPlaying(true);
    // Simulate video playing
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const handleStartTrial = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            See RevenueFlow in Action
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Experience the power of autonomous revenue operations through our interactive demo
          </p>
        </div>

        {/* Demo Tabs */}
        <div className="bg-slate-50 rounded-2xl p-6">
          <div className="flex flex-wrap gap-2 mb-8">
            {demoTabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-cyan-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:scale-102'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.title}
              </button>
            ))}
          </div>

          {/* Demo Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {demoTabs[activeTab].content.title}
                </h3>
                <p className="text-slate-600 text-lg">
                  {demoTabs[activeTab].content.description}
                </p>
              </div>

              <div className="space-y-3">
                {demoTabs[activeTab].content.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Live Metrics */}
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-3">Live Metrics</h4>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(demoTabs[activeTab].content.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold text-cyan-600">{value}</div>
                      <div className="text-xs text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleWatchDemo}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex-1"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {isPlaying ? 'Playing Demo...' : 'Watch Interactive Demo'}
                </button>
                <button 
                  onClick={handleStartTrial}
                  className="inline-flex items-center px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-all duration-300"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>

            {/* Demo Visual */}
            <div className="bg-slate-900 rounded-xl p-6 text-white relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <span className="text-slate-300">Live Demo</span>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>

              {isPlaying && (
                <div className="absolute inset-0 bg-slate-800/90 flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-cyan-400">Loading Interactive Demo...</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Processing Status</span>
                    <span className="text-green-400 text-sm flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Active
                    </span>
                  </div>
                  <div className="bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800 rounded-lg p-3 hover:bg-slate-700 transition-colors">
                    <div className="text-2xl font-bold text-cyan-400">
                      {demoTabs[activeTab].content.metrics[Object.keys(demoTabs[activeTab].content.metrics)[0]]}
                    </div>
                    <div className="text-xs text-slate-400">
                      {Object.keys(demoTabs[activeTab].content.metrics)[0].replace(/([A-Z])/g, ' $1')}
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3 hover:bg-slate-700 transition-colors">
                    <div className="text-2xl font-bold text-green-400">
                      {demoTabs[activeTab].content.metrics[Object.keys(demoTabs[activeTab].content.metrics)[1]]}
                    </div>
                    <div className="text-xs text-slate-400">
                      {Object.keys(demoTabs[activeTab].content.metrics)[1].replace(/([A-Z])/g, ' $1')}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-2">Recent Activity</div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-sm">Lead scored and routed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm">Deal updated in CRM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-sm">Notification sent to sales</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Elements */}
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-3">Quick Actions</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs py-2 px-3 rounded transition-colors">
                      Process Lead
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs py-2 px-3 rounded transition-colors">
                      Update Deal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to see your own data in action?
            </h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-6">
              Book a personalized demo with your actual data and see exactly how RevenueFlow will transform your revenue operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleStartTrial}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Start Free Trial
              </button>
              <button className="bg-slate-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors">
                Schedule Personal Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;