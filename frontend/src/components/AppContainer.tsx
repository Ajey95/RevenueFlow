import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import App from '../App';
import DashboardView from './DashboardView';
import LeadsView from './LeadsView';
import DealsView from './DealsView';
import AgentsView from './AgentsView';
import SettingsView from './SettingsView';

type PageType = 'home' | 'dashboard' | 'leads' | 'deals' | 'agents' | 'settings';

export default function AppContainer() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  useEffect(() => {
    // Set initial page based on URL
    const path = window.location.pathname;
    if (path === '/dashboard') setCurrentPage('dashboard');
    else if (path === '/leads') setCurrentPage('leads');
    else if (path === '/deals') setCurrentPage('deals');
    else if (path === '/agents') setCurrentPage('agents');
    else if (path === '/settings') setCurrentPage('settings');
    else setCurrentPage('home');

    // Handle browser back/forward
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/dashboard') setCurrentPage('dashboard');
      else if (path === '/leads') setCurrentPage('leads');
      else if (path === '/deals') setCurrentPage('deals');
      else if (path === '/agents') setCurrentPage('agents');
      else if (path === '/settings') setCurrentPage('settings');
      else setCurrentPage('home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardView />;
      case 'leads':
        return <LeadsView />;
      case 'deals':
        return <DealsView />;
      case 'agents':
        return <AgentsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <App />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation currentPage={currentPage} onNavigate={(page) => setCurrentPage(page as PageType)} />
      {renderPage()}
    </div>
  );
}
