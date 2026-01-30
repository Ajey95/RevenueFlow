import React, { useState } from 'react';
import { Check, Star, Calculator, Users, ArrowRight, Zap } from 'lucide-react';

const PricingSection = () => {
  const [teamSize, setTeamSize] = useState(100);
  const [conversionRate, setConversionRate] = useState(25);
  const [selectedPlan, setSelectedPlan] = useState(1);

  const calculateROI = () => {
    const baseSavings = teamSize * 0.4 * 2000; // 40% time savings * average hourly cost
    const revenueIncrease = teamSize * 0.25 * 150000; // 25% revenue increase per rep
    const totalValue = baseSavings + revenueIncrease;
    const monthlyCost = teamSize * 199; // Professional plan cost
    const monthlySavings = totalValue / 12 - monthlyCost;
    return Math.round(monthlySavings);
  };

  const handleStartTrial = (planName: string) => {
    // In a real app, this would redirect to signup with the selected plan
    alert(`Starting free trial for ${planName} plan! 🚀`);
  };

  const handleContactSales = () => {
    // In a real app, this would open a contact form or redirect to sales
    alert('Redirecting to sales team... 📞');
  };

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$99',
      period: 'per user/month',
      description: 'Perfect for small teams getting started',
      maxUsers: 'Up to 50 users',
      features: [
        'Core lead management',
        'Basic automation',
        'Standard integrations',
        'Email support',
        'Mobile app access',
        'Basic reporting'
      ],
      ctaText: 'Start Free Trial',
      ctaStyle: 'bg-slate-600 hover:bg-slate-700',
      popular: false
    },
    {
      name: 'Professional',
      price: '$199',
      period: 'per user/month',
      description: 'For growing teams that need advanced features',
      maxUsers: 'Up to 500 users',
      features: [
        'Advanced AI features',
        'Predictive analytics',
        'Custom workflows',
        'Priority support + CSM',
        'Advanced reporting',
        'API access',
        'Custom integrations',
        'White-label options'
      ],
      ctaText: 'Start Free Trial',
      ctaStyle: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations with custom needs',
      maxUsers: '500+ users',
      features: [
        'Everything in Professional',
        'Custom development',
        'Dedicated infrastructure',
        'SLA guarantees',
        'On-premise deployment',
        'Advanced security',
        'Training & onboarding',
        'Dedicated success team'
      ],
      ctaText: 'Contact Sales',
      ctaStyle: 'bg-slate-600 hover:bg-slate-700',
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Transparent Pricing That
            <span className="block text-cyan-500">Scales With You</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose the plan that fits your team size and requirements. All plans include a 30-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-slate-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                plan.popular ? 'border-2 border-cyan-500 scale-105' : 'border-2 border-transparent hover:border-slate-300'
              } ${selectedPlan === index ? 'ring-2 ring-cyan-500' : ''}`}
              onClick={() => setSelectedPlan(index)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-slate-900 mb-1">
                  {plan.price}
                  {plan.price !== 'Custom' && (
                    <span className="text-lg font-normal text-slate-600">/{plan.period}</span>
                  )}
                </div>
                <p className="text-slate-600">{plan.description}</p>
                <p className="text-sm text-slate-500 mt-2">{plan.maxUsers}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => plan.name === 'Enterprise' ? handleContactSales() : handleStartTrial(plan.name)}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center ${plan.ctaStyle}`}
              >
                {plan.ctaText}
                {plan.name !== 'Enterprise' && <ArrowRight className="w-4 h-4 ml-2" />}
              </button>

              {plan.popular && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center text-sm text-cyan-600 font-medium">
                    <Zap className="w-4 h-4 mr-1" />
                    Save 20% with annual billing
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ROI Calculator */}
        <div className="bg-slate-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center">
              <Calculator className="w-8 h-8 mr-3 text-cyan-500" />
              ROI Calculator
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Calculate your potential return on investment with RevenueFlow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Team Size: {teamSize} users
                </label>
                <div className="flex items-center space-x-4">
                  <Users className="w-5 h-5 text-slate-400" />
                  <input
                    type="range"
                    min="10"
                    max="500"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-lg font-semibold text-slate-900 min-w-[3rem]">
                    {teamSize}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Conversion Rate: {conversionRate}%
                </label>
                <div className="flex items-center space-x-4">
                  <span className="text-slate-400">%</span>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-lg font-semibold text-slate-900 min-w-[3rem]">
                    {conversionRate}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="text-lg font-bold text-slate-900 mb-4">Your ROI Projection</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Monthly Cost:</span>
                  <span className="font-semibold text-slate-900">
                    ${(teamSize * 199).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Time Savings:</span>
                  <span className="font-semibold text-green-600">
                    ${(teamSize * 0.4 * 2000 / 12).toLocaleString()}/month
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Revenue Increase:</span>
                  <span className="font-semibold text-green-600">
                    ${(teamSize * 0.25 * 150000 / 12).toLocaleString()}/month
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-900 font-semibold">Net Monthly Benefit:</span>
                    <span className="font-bold text-cyan-600 text-lg">
                      ${calculateROI().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-cyan-50 rounded-lg">
                <div className="text-sm text-cyan-800">
                  <strong>ROI: {Math.round((calculateROI() / (teamSize * 199)) * 100)}%</strong> return on investment
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-slate-600 mb-4">
              Based on a {teamSize}-person team with {conversionRate}% conversion rate
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleStartTrial('Professional')}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Start Free Trial
              </button>
              <button 
                onClick={handleContactSales}
                className="bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
              >
                Get Detailed ROI Analysis
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-slate-600">30-day free trial</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-slate-600">Setup in 30 minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-slate-600">No credit card required</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-2">
              <ArrowRight className="w-6 h-6 text-cyan-600" />
            </div>
            <span className="text-sm text-slate-600">Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;