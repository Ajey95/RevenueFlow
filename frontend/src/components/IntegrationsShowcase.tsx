import React from 'react';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';

const IntegrationsShowcase = () => {
  const integrationCategories = [
    {
      title: 'CRM Systems',
      status: 'Available Now',
      statusColor: 'text-green-500',
      statusBg: 'bg-green-50',
      integrations: ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho CRM']
    },
    {
      title: 'Marketing Automation',
      status: 'Available Now',
      statusColor: 'text-green-500',
      statusBg: 'bg-green-50',
      integrations: ['Marketo', 'Pardot', 'Mailchimp', 'ActiveCampaign']
    },
    {
      title: 'Communication Tools',
      status: 'Available Now',
      statusColor: 'text-green-500',
      statusBg: 'bg-green-50',
      integrations: ['Slack', 'Microsoft Teams', 'Gmail', 'Outlook']
    },
    {
      title: 'Coming Soon',
      status: 'Q4 2025',
      statusColor: 'text-blue-500',
      statusBg: 'bg-blue-50',
      integrations: ['Gainsight', 'ChurnZero', 'Outreach', 'SalesLoft']
    }
  ];

  const integrationSteps = [
    {
      step: 1,
      title: 'Connect',
      description: 'OAuth flow',
      icon: '🔗'
    },
    {
      step: 2,
      title: 'Map Data',
      description: 'Intelligent suggestions',
      icon: '🗺️'
    },
    {
      step: 3,
      title: 'Sync',
      description: 'Real-time updates',
      icon: '🔄'
    },
    {
      step: 4,
      title: 'Optimize',
      description: 'AI recommendations',
      icon: '🚀'
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Connects with Your
            <span className="block text-cyan-500">Entire Tech Stack</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Seamless integration with 20+ business tools, with more being added every month
          </p>
        </div>

        {/* Integration Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {integrationCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">{category.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${category.statusColor} ${category.statusBg}`}>
                  {category.status}
                </span>
              </div>
              
              <div className="space-y-3">
                {category.integrations.map((integration, integrationIndex) => (
                  <div key={integrationIndex} className="flex items-center space-x-3">
                    {category.status === 'Available Now' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-blue-500" />
                    )}
                    <span className="text-slate-700">{integration}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Integration Process */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">
            Simple Integration Process
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {integrationSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {step.step}
                  </div>
                  {index < integrationSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full">
                      <ArrowRight className="w-6 h-6 text-slate-400 mx-auto" />
                    </div>
                  )}
                </div>
                
                <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Hub Visual */}
        <div className="mt-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              One Platform, Infinite Possibilities
            </h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              RevenueFlow acts as your central hub, connecting all your revenue tools and creating a unified data ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h4 className="text-lg font-bold text-cyan-400 mb-3">Data Unification</h4>
              <p className="text-slate-300 text-sm">
                Eliminate data silos by connecting all your tools into a single, coherent system
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h4 className="text-lg font-bold text-cyan-400 mb-3">Real-time Sync</h4>
              <p className="text-slate-300 text-sm">
                Keep all your systems in perfect sync with real-time data updates and conflict resolution
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h4 className="text-lg font-bold text-cyan-400 mb-3">Intelligent Routing</h4>
              <p className="text-slate-300 text-sm">
                Automatically route data to the right systems based on business rules and AI insights
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
              View All Integrations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsShowcase;