import React from 'react';
import { TrendingDown, Link2Off as LinkOff, Target } from 'lucide-react';

const ProblemStatement = () => {
  const problems = [
    {
      icon: TrendingDown,
      title: '$2.3M Annual Revenue Loss',
      subtitle: 'Per 100-person sales team',
      description: 'Due to administrative overhead',
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      borderColor: 'border-red-400/20'
    },
    {
      icon: LinkOff,
      title: '47% of Deals Stall',
      subtitle: 'Poor cross-team handoffs',
      description: 'From miscommunication',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      borderColor: 'border-orange-400/20'
    },
    {
      icon: Target,
      title: '23% of Qualified Leads',
      subtitle: 'Never receive proper follow-up',
      description: 'Fall through the cracks',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/20'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Revenue Teams Are Drowning in
            <span className="block text-red-500">Manual Work</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            While your competitors automate and scale, manual processes are secretly 
            destroying your revenue potential and burning out your best performers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl border-2 ${problem.borderColor} ${problem.bgColor} backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-105`}
            >
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${problem.bgColor} mb-6`}>
                  <problem.icon className={`w-8 h-8 ${problem.color}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {problem.title}
                </h3>
                
                <p className="text-lg text-slate-600 mb-2">
                  {problem.subtitle}
                </p>
                
                <p className={`text-sm font-medium ${problem.color}`}>
                  {problem.description}
                </p>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-900/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call out section */}
        <div className="mt-16 text-center">
          <div className="bg-slate-900 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              The hidden cost of manual processes is destroying your growth potential
            </h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Every minute spent on administrative tasks is a minute not spent closing deals, 
              nurturing relationships, or driving strategic initiatives that actually grow revenue.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;