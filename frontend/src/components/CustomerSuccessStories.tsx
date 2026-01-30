import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Clock, DollarSign } from 'lucide-react';

const CustomerSuccessStories = () => {
  const [currentStory, setCurrentStory] = useState(0);

  const successStories = [
    {
      company: 'TechCorp',
      industry: 'Mid-market SaaS',
      logo: 'TC',
      challenge: 'Manual lead routing and poor conversion rates were costing them qualified opportunities',
      solution: 'Implemented RevenueFlow\'s autonomous lead management and AI-powered deal orchestration',
      results: [
        { metric: '42%', description: 'Increase in qualified leads', icon: TrendingUp },
        { metric: '28%', description: 'Faster deal closure', icon: Clock },
        { metric: '$1.2M', description: 'Additional revenue in 6 months', icon: DollarSign }
      ],
      quote: 'RevenueFlow transformed our entire sales process. We went from losing leads to converting them at rates we never thought possible.',
      author: 'Sarah Johnson',
      role: 'VP of Sales',
      timeline: '6 months'
    },
    {
      company: 'ServicePro',
      industry: 'Professional Services',
      logo: 'SP',
      challenge: 'Fragmented systems and poor forecasting accuracy were hampering growth planning',
      solution: 'Deployed RevenueFlow\'s predictive analytics and cross-platform integration suite',
      results: [
        { metric: '95%', description: 'Forecast accuracy achieved', icon: TrendingUp },
        { metric: '35%', description: 'Reduction in admin time', icon: Clock },
        { metric: '300%', description: 'ROI within 12 months', icon: DollarSign }
      ],
      quote: 'Finally, a single source of truth for our revenue data. Our forecasting went from guesswork to science.',
      author: 'Michael Chen',
      role: 'Chief Revenue Officer',
      timeline: '4 months'
    },
    {
      company: 'GrowthCo',
      industry: 'E-commerce Platform',
      logo: 'GC',
      challenge: 'Scaling challenges with manual processes limiting revenue team productivity',
      solution: 'Implemented comprehensive workflow automation and AI-powered insights',
      results: [
        { metric: '60%', description: 'Increase in team productivity', icon: TrendingUp },
        { metric: '45%', description: 'Faster onboarding', icon: Clock },
        { metric: '$2.8M', description: 'Revenue increase in first year', icon: DollarSign }
      ],
      quote: 'RevenueFlow enabled us to scale our revenue operations without proportionally scaling our team size.',
      author: 'Lisa Rodriguez',
      role: 'Head of Revenue Operations',
      timeline: '8 months'
    }
  ];

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const story = successStories[currentStory];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Results That Speak
            <span className="block text-cyan-500">for Themselves</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See how industry leaders have transformed their revenue operations and achieved measurable results
          </p>
        </div>

        <div className="relative">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Company Info & Challenge */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    {story.logo}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{story.company}</h3>
                    <p className="text-slate-600">{story.industry}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">Challenge</h4>
                  <p className="text-slate-600">{story.challenge}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">Solution</h4>
                  <p className="text-slate-600">{story.solution}</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <blockquote className="text-lg italic text-slate-700 mb-4">
                    "{story.quote}"
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-300 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-slate-900">{story.author}</p>
                      <p className="text-sm text-slate-600">{story.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Results Achieved</h4>
                  <div className="space-y-4">
                    {story.results.map((result, index) => (
                      <div key={index} className="bg-slate-50 rounded-xl p-4 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                          <result.icon className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-slate-900">{result.metric}</div>
                          <div className="text-slate-600">{result.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-6 text-white">
                  <h4 className="text-lg font-semibold mb-2">Implementation Timeline</h4>
                  <p className="text-cyan-100">
                    Full implementation and results achieved within {story.timeline}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevStory}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-2">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentStory ? 'bg-cyan-500' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextStory}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-6">
              Join hundreds of revenue leaders who have transformed their operations with RevenueFlow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                Start Your Free Trial
              </button>
              <button className="bg-slate-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors">
                View More Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerSuccessStories;