import { useBackendHealth, useAgentStatus } from '../hooks/useBackendIntegration';

export default function BackendStatus() {
  const { health, loading: healthLoading, error: healthError } = useBackendHealth();
  const { status, loading: statusLoading } = useAgentStatus();

  if (healthLoading) {
    return (
      <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-sm">Connecting to backend...</span>
        </div>
      </div>
    );
  }

  if (healthError) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow-lg max-w-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <div>
            <div className="text-sm font-semibold">Backend Offline</div>
            <div className="text-xs">{healthError}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold">Backend Connected</span>
        </div>
        
        {status && !statusLoading && (
          <div className="text-xs space-y-1 border-t border-green-300 pt-2">
            <div className="flex justify-between">
              <span>Active Agents:</span>
              <span className="font-semibold">{status.activeAgents}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Tasks:</span>
              <span className="font-semibold">{status.totalTasks}</span>
            </div>
            <div className="flex justify-between">
              <span>Success Rate:</span>
              <span className="font-semibold">{status.successRate}%</span>
            </div>
            <div className="flex justify-between">
              <span>Uptime:</span>
              <span className="font-semibold">
                {Math.floor(status.uptime / 60000)}m
              </span>
            </div>
          </div>
        )}
        
        <div className="text-xs text-green-600 border-t border-green-300 pt-2">
          Port: 3001 | Status: {health?.status}
        </div>
      </div>
    </div>
  );
}
