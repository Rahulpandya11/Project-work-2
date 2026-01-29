
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { PropertiesPage } from './pages/Properties';
import { ClientsPage } from './pages/Clients';
import { MatchingPage } from './pages/Matching';
import { ReportsPage } from './pages/Reports';
import { SettingsPage } from './pages/Settings';
import { LoginPage } from './pages/Login';
import { MOCK_PROPERTIES, MOCK_CLIENTS } from './mockData';
import { Property, Client } from './types';

export enum NavigationTab {
  DASHBOARD = 'dashboard',
  PROPERTIES = 'properties',
  CLIENTS = 'clients',
  MATCHING = 'matching',
  REPORTS = 'reports',
  SETTINGS = 'settings'
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.DASHBOARD);
  
  // Application Data State with LocalStorage Persistence
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('propmate_properties');
    return saved ? JSON.parse(saved) : MOCK_PROPERTIES;
  });

  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('propmate_clients');
    return saved ? JSON.parse(saved) : MOCK_CLIENTS;
  });

  const [userPlan, setUserPlan] = useState<'Free' | 'Premium'>('Free');
  const [preselectedClient, setPreselectedClient] = useState<Client | null>(null);

  // Sync to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('propmate_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('propmate_clients', JSON.stringify(clients));
  }, [clients]);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const addProperty = (prop: Property) => setProperties([prop, ...properties]);
  const addClient = (client: Client) => setClients([client, ...clients]);

  const handleNavigateProperties = () => setActiveTab(NavigationTab.PROPERTIES);
  const handleNavigateClients = () => setActiveTab(NavigationTab.CLIENTS);
  const handleGoHome = () => setActiveTab(NavigationTab.DASHBOARD);
  const handleOpenReports = () => setActiveTab(NavigationTab.REPORTS);
  const handleOpenSettings = () => setActiveTab(NavigationTab.SETTINGS);

  const handleAutoMatch = (client: Client) => {
    setPreselectedClient(client);
    setActiveTab(NavigationTab.MATCHING);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab(NavigationTab.DASHBOARD); // Reset tab for next login
  };

  const renderContent = () => {
    switch (activeTab) {
      case NavigationTab.DASHBOARD:
        return <Dashboard properties={properties} clients={clients} />;
      case NavigationTab.PROPERTIES:
        return <PropertiesPage properties={properties} onAdd={addProperty} />;
      case NavigationTab.CLIENTS:
        return <ClientsPage clients={clients} onAdd={addClient} onAutoMatch={handleAutoMatch} />;
      case NavigationTab.MATCHING:
        return <MatchingPage properties={properties} clients={clients} initialClient={preselectedClient} />;
      case NavigationTab.REPORTS:
        return <ReportsPage properties={properties} clients={clients} />;
      case NavigationTab.SETTINGS:
        return <SettingsPage userPlan={userPlan} onUpgrade={() => setUserPlan('Premium')} onLogout={handleLogout} />;
      default:
        return <Dashboard properties={properties} clients={clients} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={(tab: any) => setActiveTab(tab)}
      userPlan={userPlan}
      onLogout={handleLogout}
      onQuickViewProperties={handleNavigateProperties}
      onQuickViewClients={handleNavigateClients}
      onQuickOpenReports={handleOpenReports}
      onQuickOpenSettings={handleOpenSettings}
      onGoHome={handleGoHome}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
