import { useState, useEffect } from 'react';
import { apiClient, API_ENDPOINTS } from '../config/api';

export interface BackendHealth {
  status: string;
  timestamp: string;
  agents: any;
}

export interface DashboardData {
  overview: {
    totalRevenue: number;
    revenueTarget: number;
    revenueProgress: number;
    totalLeads: number;
    totalDeals: number;
    averageDealSize: number;
    conversionRate: number;
    forecastAccuracy: string;
  };
  leadMetrics: any;
  dealMetrics: any;
  revenueMetrics: any;
}

export interface AgentStatus {
  isRunning: boolean;
  uptime: number;
  activeAgents: number;
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  successRate: string;
  agents: any;
}

// Hook to check backend health
export function useBackendHealth() {
  const [health, setHealth] = useState<BackendHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const data = await apiClient.get(API_ENDPOINTS.health);
        setHealth(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to connect to backend');
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { health, loading, error };
}

// Hook to fetch dashboard analytics
export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('Fetching dashboard data from:', API_ENDPOINTS.analytics.dashboard);
      const result = await apiClient.get(API_ENDPOINTS.analytics.dashboard);
      console.log('Dashboard data received:', result);
      // Extract data from wrapped response
      const actualData = result.data || result;
      setData(actualData);
      setError(null);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

// Hook to fetch agent status
export function useAgentStatus() {
  const [status, setStatus] = useState<AgentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const result = await apiClient.get(API_ENDPOINTS.agents.status);
      // Extract orchestrator data from wrapped response
      const actualStatus = result.orchestrator || result;
      setStatus(actualStatus);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch agent status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return { status, loading, error, refetch: fetchStatus };
}

// Hook to process leads
export function useLeadProcessing() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processLead = async (leadData: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiClient.post(API_ENDPOINTS.leads.create, leadData);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process lead';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { processLead, loading, error };
}
