import React from 'react';
import { Brain, Network, Puzzle, Italic as Crystal } from 'lucide-react';

const SolutionOverview = () => {
  const solutions = [
    {
      icon: Brain,
      title: 'Autonomous Lead Management',
      description: 'Automatically scores, enriches, and routes leads from 15+ sources within 2 minutes',
      benefit: '95% routing accuracy, zero manual intervention',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10',
      borderColor: 'border-cyan-400/20'
    },
    {
      icon: Network,
      title: 'Intelligent Deal Orchestration',
      description: 'AI-powered recommendations and automation manage deal progression',
      benefit: '90% accuracy in identifying at-risk deals',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/20'
    },
    {
      icon: Puzzle,
      title: 'Cross-Platform Integration',
      description: 'Seamlessly connects 20+ business tools with real-time sync',
      benefit: '99.9% uptime, unified data source',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      borderColor: 'border-purple-400/20'
    },
    {
      icon: Crystal,
      title: 'Predictive Revenue Analytics',
      description: 'Forward-looking insights and revenue forecasting',
      benefit: '95% forecast accuracy, 85% churn prediction',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
      borderColor: 'border-emerald-400/20'
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Meet RevenueFlow:
            <span className="block bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Your Autonomous Revenue Agent
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Imagine having a tireless AI agent that handles every aspect of your revenue operations 
            while you focus on strategy and relationship building.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl border-2 ${solution.borderColor} ${solution.bgColor} backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${solution.bgColor} flex items-center justify-center`}>
                  <solution.icon className={`w-6 h-6 ${solution.color}`} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {solution.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-4">
                    {solution.description}
                  </p>
                  
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${solution.color} ${solution.bgColor} border ${solution.borderColor}`}>
                    {solution.benefit}
                  </div>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-900/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Stop managing revenue operations. Start orchestrating them.
            </h3>
            <p className="text-cyan-100 text-lg max-w-2xl mx-auto mb-6">
              RevenueFlow doesn't just automate tasks—it thinks, learns, and evolves 
              to continuously optimize your entire revenue engine.
            </p>
            <button className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
              See How It Works
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionOverview;