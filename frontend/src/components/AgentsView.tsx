import React, { useState, useEffect } from 'react';
import { Activity, Zap, TrendingUp } from 'lucide-react';
import { apiClient, API_ENDPOINTS } from '../config/api';

export default function AgentsView() {
  const [agentStatus, setAgentStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgentStatus();
    const interval = setInterval(fetchAgentStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchAgentStatus = async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.agents.status);
      setAgentStatus(response);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch agent status:', error);
      setLoading(false);
    }
  };

  if (loading || !agentStatus) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const { agents, orchestrator } = agentStatus;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Autonomous Agents</h1>
        <p className="text-slate-600 mt-2">Monitor and manage your AI agents</p>
      </div>

      {/* Orchestrator Stats */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Orchestrator Status</h2>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
            {orchestrator.isRunning ? '🟢 Active' : '🔴 Inactive'}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-3xl font-bold">{orchestrator.activeAgents}</div>
            <div className="text-blue-100">Active Agents</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{orchestrator.totalTasks}</div>
            <div className="text-blue-100">Total Tasks</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{orchestrator.successRate}</div>
            <div className="text-blue-100">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{orchestrator.uptime}m</div>
            <div className="text-blue-100">Uptime</div>
          </div>
        </div>
      </div>

      {/* Individual Agents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lead Agent */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Lead Agent</h3>
                <p className="text-sm text-slate-600">Processing leads</p>
              </div>
            </div>
            <span className={`h-3 w-3 rounded-full ${agents.leadAgent.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Processed</span>
              <span className="font-semibold">{agents.leadAgent.processedLeads}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Accuracy</span>
              <span className="font-semibold">{agents.leadAgent.accuracy}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Efficiency</span>
              <span className="font-semibold">{agents.leadAgent.efficiency}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Avg Time</span>
              <span className="font-semibold">{agents.leadAgent.averageProcessingTime}s</span>
            </div>
          </div>
        </div>

        {/* Deal Agent */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Deal Agent</h3>
                <p className="text-sm text-slate-600">Monitoring deals</p>
              </div>
            </div>
            <span className={`h-3 w-3 rounded-full ${agents.dealAgent.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Analyzed</span>
              <span className="font-semibold">{agents.dealAgent.analyzedDeals}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Risks Prevented</span>
              <span className="font-semibold">{agents.dealAgent.risksPrevented}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Monitored</span>
              <span className="font-semibold">{agents.dealAgent.dealsMonitored}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Avg Time</span>
              <span className="font-semibold">{agents.dealAgent.averageAnalysisTime}s</span>
            </div>
          </div>
        </div>

        {/* Revenue Agent */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Revenue Agent</h3>
                <p className="text-sm text-slate-600">Forecasting revenue</p>
              </div>
            </div>
            <span className={`h-3 w-3 rounded-full ${agents.revenueAgent.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Forecasts</span>
              <span className="font-semibold">{agents.revenueAgent.forecastsGenerated}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Accuracy</span>
              <span className="font-semibold">{agents.revenueAgent.forecastAccuracy}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Optimizations</span>
              <span className="font-semibold">{agents.revenueAgent.optimizationsFound}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Q4 Forecast</span>
              <span className="font-semibold">${(agents.revenueAgent.currentQuarter / 1000000).toFixed(2)}M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
