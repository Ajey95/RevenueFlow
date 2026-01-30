import React from 'react';
import { Quote } from 'lucide-react';

const TargetPersonas = () => {
  const personas = [
    {
      name: 'Sarah Chen',
      role: 'RevOps Manager',
      company: 'TechCorp',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      quote: 'Finally, a tool that eliminates our data silos and automates our entire lead routing process',
      goals: ['Increase team productivity', 'Reduce manual processes', 'Improve data accuracy'],
      successMetric: '40% reduction in admin time',
      results: ['Eliminated 3 hours of daily manual work', 'Increased lead routing accuracy to 95%', 'Reduced data errors by 85%']
    },
    {
      name: 'Mike Rodriguez',
      role: 'Sales Director',
      company: 'GrowthCo',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      quote: 'Our win rates increased 25% and deal cycles shortened by 30% in just 3 months',
      goals: ['Hit revenue targets', 'Improve win rates', 'Accelerate deal velocity'],
      successMetric: '25% increase in win rate',
      results: ['Exceeded quarterly targets by 15%', 'Reduced average deal cycle by 30%', 'Improved forecast accuracy to 94%']
    },
    {
      name: 'Lisa Park',
      role: 'Marketing Ops Manager',
      company: 'ScaleUp Inc',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      quote: 'Lead-to-opportunity conversion improved 35% with clear attribution and ROI visibility',
      goals: ['Improve lead quality', 'Demonstrate ROI', 'Optimize campaigns'],
      successMetric: '35% better conversion rates',
      results: ['Increased MQL to SQL conversion by 35%', 'Improved campaign ROI visibility', 'Reduced cost per acquisition by 22%']
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Built for Revenue Teams Who
            <span className="block text-cyan-500">Demand Excellence</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See how industry leaders are transforming their revenue operations with RevenueFlow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personas.map((persona, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={persona.image} 
                    alt={persona.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{persona.name}</h3>
                <p className="text-slate-600">{persona.role}</p>
                <p className="text-sm text-slate-500">{persona.company}</p>
              </div>

              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-cyan-200" />
                <blockquote className="text-slate-700 italic pl-6">
                  "{persona.quote}"
                </blockquote>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Key Goals</h4>
                  <ul className="space-y-1">
                    {persona.goals.map((goal, goalIndex) => (
                      <li key={goalIndex} className="flex items-center text-sm text-slate-600">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-cyan-50 rounded-lg p-4">
                  <h4 className="font-semibold text-cyan-900 mb-2">Success Metric</h4>
                  <p className="text-cyan-800 font-medium">{persona.successMetric}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Results Achieved</h4>
                  <ul className="space-y-1">
                    {persona.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-center text-sm text-slate-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Join 500+ Revenue Leaders Who've Transformed Their Operations
            </h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-6">
              Whether you're in RevOps, Sales, or Marketing Operations, RevenueFlow adapts to your unique needs and scales with your growth.
            </p>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
              See Your ROI Potential
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetPersonas;