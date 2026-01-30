import React, { useState } from 'react';
import { ArrowRight, Play, Download, Shield, Clock, CreditCard, CheckCircle, Zap } from 'lucide-react';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleStartTrial = () => {
    if (email) {
      setIsSubmitted(true);
      // In a real app, this would start the trial process
      setTimeout(() => {
        alert(`🚀 Welcome to RevenueFlow! Check your email (${email}) for setup instructions.`);
      }, 1000);
    } else {
      // Scroll to pricing section if no email provided
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleWatchDemo = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadROI = () => {
    // In a real app, this would trigger a download
    alert('📊 ROI Calculator downloaded! Check your downloads folder.');
  };

  const trustIndicators = [
    {
      icon: CreditCard,
      text: 'No credit card required'
    },
    {
      icon: Clock,
      text: 'Setup in under 30 minutes'
    },
    {
      icon: Shield,
      text: 'Cancel anytime'
    },
    {
      icon: ArrowRight,
      text: '30-day money-back guarantee'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Revenue Operations?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12">
            Join thousands of revenue professionals who have eliminated manual work and 
            accelerated their growth with RevenueFlow's AI-powered automation.
          </p>

          {/* Email Signup Form */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                disabled={isSubmitted}
              />
              <button 
                onClick={handleStartTrial}
                disabled={isSubmitted}
                className="group relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Starting Trial...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Start Free Trial</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
            {isSubmitted && (
              <p className="text-green-400 text-sm mt-2 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Trial setup in progress...
              </p>
            )}
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={handleWatchDemo}
              className="group inline-flex items-center px-8 py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-700/50 transition-all duration-300 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Schedule a Personalized Demo
            </button>
          </div>

          {/* Secondary CTA */}
          <div className="mb-12">
            <button 
              onClick={handleDownloadROI}
              className="inline-flex items-center px-6 py-3 bg-transparent border border-slate-600 text-slate-300 font-medium rounded-lg hover:bg-slate-800/50 transition-all duration-300"
            >
              <Download className="w-5 h-5 mr-2" />
              Download ROI Calculator
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 text-slate-400">
                <indicator.icon className="w-4 h-4" />
                <span className="text-sm">{indicator.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Value Props */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Setup</h3>
            <p className="text-slate-300">
              Get started in minutes, not weeks. Our intelligent setup wizard guides you through the entire process.
            </p>
          </div>
          
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Expert Support</h3>
            <p className="text-slate-300">
              Dedicated customer success team ensures you achieve maximum value from day one.
            </p>
          </div>
          
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Proven Results</h3>
            <p className="text-slate-300">
              Join 500+ revenue leaders who've increased productivity by 40% and revenue by 25%.
            </p>
          </div>
        </div>

        {/* Final Urgency */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-8 border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">
              Don't Let Manual Processes Hold You Back
            </h3>
            <p className="text-slate-300 mb-6">
              Every day without automation costs you qualified leads, deals, and revenue. 
              Start your transformation today.
            </p>
            <div className="text-cyan-400 font-semibold flex items-center justify-center">
              <Zap className="w-5 h-5 mr-2" />
              Limited Time: Get 2 months free with annual plans
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;