import React, { useState, useEffect } from 'react';
import { Play, ArrowRight, Bot, TrendingUp, Target, Clock, Star } from 'lucide-react';

const Hero = () => {
  const [counters, setCounters] = useState({
    overhead: 0,
    revenue: 0,
    conversion: 0,
    closure: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const duration = 2000;
    const targets = {
      overhead: 40,
      revenue: 25,
      conversion: 30,
      closure: 35
    };

    const intervals = Object.keys(targets).map(key => {
      const target = targets[key];
      const increment = target / (duration / 50);
      
      return setInterval(() => {
        setCounters(prev => {
          const newValue = Math.min(prev[key] + increment, target);
          return { ...prev, [key]: Math.round(newValue) };
        });
      }, 50);
    });

    setTimeout(() => {
      intervals.forEach(interval => clearInterval(interval));
    }, duration);

    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);

  const handleStartTrial = () => {
    // Scroll to pricing section
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWatchDemo = () => {
    // Scroll to demo section
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden pt-16">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Hero badge */}
          <div className={`inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-cyan-400 text-sm font-medium mb-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <Bot className="w-4 h-4 mr-2" />
            World's First Autonomous Revenue Operations Agent
            <Star className="w-4 h-4 ml-2 text-yellow-400" />
          </div>

          {/* Main headline */}
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            The World's First
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Autonomous Revenue
            </span>
            <br />
            Operations Agent
          </h1>

          {/* Subheadline */}
          <p className={`text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Eliminate 60-70% of manual work. Increase revenue per rep by 25%. 
            Transform your entire revenue lifecycle with AI that never sleeps.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transform transition-all duration-1000 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <a
              href="/dashboard"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
            >
              <span className="relative z-10">View Live Dashboard</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <button 
              onClick={handleWatchDemo}
              className="group inline-flex items-center px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-700/50 transition-all duration-300 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch 3-Min Demo
            </button>
          </div>

          {/* Key Metrics */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto transform transition-all duration-1000 delay-800 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="text-3xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
                {counters.overhead}%
              </div>
              <div className="text-sm text-slate-300">Reduction in administrative overhead</div>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="text-3xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
                {counters.revenue}%
              </div>
              <div className="text-sm text-slate-300">Increase in revenue per sales rep</div>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="text-3xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
                {counters.conversion}%
              </div>
              <div className="text-sm text-slate-300">Improvement in lead-to-opportunity conversion</div>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="text-3xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
                {counters.closure}%
              </div>
              <div className="text-sm text-slate-300">Faster deal closure cycles</div>
            </div>
          </div>
        </div>

        {/* Hero Visual - Dashboard Mockup */}
        <div className={`mt-16 relative transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500">
            <div className="bg-slate-900/60 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="text-slate-400 text-sm">RevenueFlow Dashboard</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800/60 rounded-xl p-4 hover:bg-slate-700/60 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300 text-sm">Active Deals</span>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">247</div>
                  <div className="text-green-400 text-sm">↑ 23% this month</div>
                </div>
                
                <div className="bg-slate-800/60 rounded-xl p-4 hover:bg-slate-700/60 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300 text-sm">Conversion Rate</span>
                    <Target className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">34.2%</div>
                  <div className="text-cyan-400 text-sm">↑ 8% this month</div>
                </div>
                
                <div className="bg-slate-800/60 rounded-xl p-4 hover:bg-slate-700/60 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300 text-sm">Avg. Deal Time</span>
                    <Clock className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">18d</div>
                  <div className="text-purple-400 text-sm">↓ 12% this month</div>
                </div>
              </div>

              {/* Live Activity Feed */}
              <div className="mt-6 bg-slate-800/40 rounded-xl p-4">
                <div className="text-slate-300 text-sm mb-3">Live Activity Feed</div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-300">New lead scored and routed to Sarah Chen</span>
                    <span className="text-slate-500">2s ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-300">Deal moved to "Proposal" stage - TechCorp</span>
                    <span className="text-slate-500">15s ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-300">Forecast updated: +$47K this quarter</span>
                    <span className="text-slate-500">1m ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;