import React from 'react';
import { DollarSign, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

export default function DealsView() {
  const deals = [
    { id: 1, company: 'TechCorp', value: 50000, stage: 'Negotiation', probability: 75 },
    { id: 2, company: 'StartupXYZ', value: 25000, stage: 'Proposal', probability: 60 },
    { id: 3, company: 'Enterprise Inc', value: 100000, stage: 'Discovery', probability: 40 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Deals Pipeline</h1>
        <p className="text-slate-600 mt-2">Track and manage your revenue opportunities</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-8 w-8 text-green-600" />
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">$175K</div>
          <div className="text-sm text-slate-600">Total Pipeline Value</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">3</div>
          <div className="text-sm text-slate-600">Active Deals</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="h-8 w-8 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">58%</div>
          <div className="text-sm text-slate-600">Avg Win Rate</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="h-8 w-8 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">23</div>
          <div className="text-sm text-slate-600">Days Avg Cycle</div>
        </div>
      </div>

      {/* Deals Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Stage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Win Probability</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {deals.map((deal) => (
              <tr key={deal.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{deal.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-600">${deal.value.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {deal.stage}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-1 bg-slate-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{width: `${deal.probability}%`}}
                      />
                    </div>
                    <span className="text-sm text-slate-600">{deal.probability}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
