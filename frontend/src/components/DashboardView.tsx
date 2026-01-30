import { useState, useEffect } from 'react';
import { useDashboardData, useAgentStatus } from '../hooks/useBackendIntegration';
import { BarChart3, TrendingUp, Users, DollarSign, Activity, Zap } from 'lucide-react';

export default function DashboardView() {
  const { data, loading, error } = useDashboardData();
  const { status } = useAgentStatus();

  console.log('Dashboard State:', { data, loading, error, status });

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-8 max-w-md">
          <h2 className="text-red-400 text-xl font-bold mb-2">Unable to Load Dashboard</h2>
          <p className="text-red-300">{error}</p>
          <p className="text-slate-400 text-sm mt-4">Make sure the backend is running on port 3000</p>
          <div className="mt-4">
            <a href="/" className="text-indigo-400 hover:text-indigo-300">← Back to Home</a>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-8 max-w-md">
          <h2 className="text-red-400 text-xl font-bold mb-2">Unable to Load Dashboard</h2>
          <p className="text-red-300">{error}</p>
          <p className="text-slate-400 text-sm mt-4">Make sure the backend is running on port 3000</p>
        </div>
      </div>
    );
  }

  if (!data || !data.overview || !data.leadMetrics || !data.dealMetrics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">RevenueFlow Dashboard</h1>
        <p className="text-slate-400">Real-time autonomous revenue operations</p>
      </div>

      {/* Overview Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-green-400" />
            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
              {data.overview.revenueProgress}%
            </span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-white">
            ${(data.overview.totalRevenue / 1000000).toFixed(2)}M
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Target: ${(data.overview.revenueTarget / 1000000).toFixed(2)}M
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-blue-400" />
            <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
              {data.leadMetrics.newToday} new
            </span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Total Leads</p>
          <p className="text-3xl font-bold text-white">{data.overview.totalLeads}</p>
          <p className="text-xs text-slate-500 mt-1">
            Avg Score: {data.leadMetrics.averageScore}
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 text-purple-400" />
            <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded">
              {data.overview.totalDeals}
            </span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Avg Deal Size</p>
          <p className="text-3xl font-bold text-white">
            ${(data.overview.averageDealSize / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Total Value: ${(data.dealMetrics.totalValue / 1000000).toFixed(1)}M
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-indigo-400" />
            <span className="text-xs text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded">
              {data.overview.forecastAccuracy}
            </span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Conversion Rate</p>
          <p className="text-3xl font-bold text-white">
            {(data.overview.conversionRate * 100).toFixed(1)}%
          </p>
          <p className="text-xs text-slate-500 mt-1">Forecast Accuracy</p>
        </div>
      </div>

      {/* Agent Status */}
      {status && (
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-6 h-6 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">Autonomous Agent Status</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Active Agents</p>
                <p className="text-2xl font-bold text-white">{status.activeAgents}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Tasks</p>
                <p className="text-2xl font-bold text-white">{status.totalTasks}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-green-400">{status.successRate}%</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Uptime</p>
                <p className="text-2xl font-bold text-white">
                  {status.uptime}m
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lead Sources */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Lead Sources</h3>
          <div className="space-y-3">
            {data.leadMetrics?.bySource && Object.entries(data.leadMetrics.bySource).map(([source, count]) => (
              <div key={source} className="flex items-center justify-between">
                <span className="text-slate-300 capitalize">{source.replace('_', ' ')}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{ width: `${(count / data.overview.totalLeads) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-semibold w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Deal Stages</h3>
          <div className="space-y-3">
            {data.dealMetrics?.byStage && Object.entries(data.dealMetrics.byStage).map(([stage, count]) => (
              <div key={stage} className="flex items-center justify-between">
                <span className="text-slate-300 capitalize">{stage.replace(/([A-Z])/g, ' $1')}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(count / data.overview.totalDeals) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-semibold w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Marketing Button */}
      <div className="max-w-7xl mx-auto text-center">
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Zap className="w-5 h-5" />
          Back to Marketing Site
        </a>
      </div>
    </div>
  );
}
