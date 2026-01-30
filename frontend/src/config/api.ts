// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Leads endpoints
  leads: {
    list: `${API_BASE_URL}/leads`,
    create: `${API_BASE_URL}/leads`,
    process: (id: string) => `${API_BASE_URL}/leads/${id}/process`,
    score: (id: string) => `${API_BASE_URL}/leads/${id}/score`,
  },
  
  // Agents endpoints
  agents: {
    status: `${API_BASE_URL}/agents/status`,
    performance: `${API_BASE_URL}/agents/performance`,
    activity: `${API_BASE_URL}/agents/activity`,
  },
  
  // Analytics endpoints
  analytics: {
    dashboard: `${API_BASE_URL}/analytics/dashboard`,
    revenue: `${API_BASE_URL}/analytics/revenue`,
    forecast: `${API_BASE_URL}/analytics/forecast`,
    trends: `${API_BASE_URL}/analytics/trends`,
  },
  
  // AI endpoints
  ai: {
    analyze: `${API_BASE_URL}/ai/analyze`,
    insights: `${API_BASE_URL}/ai/insights`,
  },
  
  // Health check
  health: 'http://localhost:3000/health',
};

// API client helper
export const apiClient = {
  async get(url: string) {
    console.log('API GET Request:', url);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    console.log('API Response Status:', response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('API Response Data:', data);
    return data;
  },
  
  async post(url: string, data: any) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async put(url: string, data: any) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async delete(url: string) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  },
};

export default API_ENDPOINTS;
