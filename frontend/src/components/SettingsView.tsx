import { useState } from 'react';
import { Database, Key, Globe, Bell } from 'lucide-react';

export default function SettingsView() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-2">Configure your RevenueFlow instance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <nav className="space-y-1">
              {[
                { icon: Database, label: 'General', id: 'general' },
                { icon: Key, label: 'API Keys', id: 'apikeys' },
                { icon: Globe, label: 'Integrations', id: 'integrations' },
                { icon: Bell, label: 'Notifications', id: 'notifications' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              {activeTab === 'general' && 'General Settings'}
              {activeTab === 'apikeys' && 'API Keys'}
              {activeTab === 'integrations' && 'Integrations'}
              {activeTab === 'notifications' && 'Notification Settings'}
            </h2>
            
            {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  defaultValue="RevenueFlow"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Backend URL
                </label>
                <input
                  type="text"
                  defaultValue="http://localhost:3000"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Timezone
                </label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>UTC</option>
                  <option>America/New_York</option>
                  <option>Europe/London</option>
                  <option>Asia/Tokyo</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">Auto-refresh Dashboard</div>
                  <div className="text-sm text-slate-600">Update data every 10 seconds</div>
                </div>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoRefresh ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                  aria-label="Toggle auto-refresh"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      autoRefresh ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {saved ? '✓ Saved!' : 'Save Changes'}
                </button>
              </div>
            </div>
            )}

            {activeTab === 'apikeys' && (
              <div className="text-center py-12">
                <Key className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                <p className="text-slate-600">API Keys management coming soon</p>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="text-center py-12">
                <Globe className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                <p className="text-slate-600">Integrations management coming soon</p>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                <p className="text-slate-600">Notification settings coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
