
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { PropertiesPage } from './pages/Properties';
import { ClientsPage } from './pages/Clients';
import { MatchingPage } from './pages/Matching';
import { ReportsPage } from './pages/Reports';
import { SettingsPage } from './pages/Settings';
import { RemindersPage } from './pages/Reminders';
import { LoginPage } from './pages/Login';
import { MOCK_PROPERTIES, MOCK_CLIENTS } from './mockData';
import { Property, Client, Reminder, ReminderStatus } from './types';

export enum NavigationTab {
  DASHBOARD = 'dashboard',
  PROPERTIES = 'properties',
  CLIENTS = 'clients',
  MATCHING = 'matching',
  REPORTS = 'reports',
  SETTINGS = 'settings',
  REMINDERS = 'reminders'
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.DASHBOARD);
  
  // Data State - Initially empty, hydrated on login
  const [properties, setProperties] = useState<Property[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [userPlan, setUserPlan] = useState<'Free' | 'Premium'>('Free');
  const [preselectedClient, setPreselectedClient] = useState<Client | null>(null);

  // Helper to generate user-specific storage keys
  const getStorageKey = (base: string) => `${base}_${currentUserEmail}`;

  // Hydrate data when a user logs in
  useEffect(() => {
    if (isLoggedIn && currentUserEmail) {
      const savedProps = localStorage.getItem(getStorageKey('propmate_properties'));
      const savedClients = localStorage.getItem(getStorageKey('propmate_clients'));
      const savedReminders = localStorage.getItem(getStorageKey('propmate_reminders'));

      setProperties(savedProps ? JSON.parse(savedProps) : MOCK_PROPERTIES);
      setClients(savedClients ? JSON.parse(savedClients) : MOCK_CLIENTS);
      setReminders(savedReminders ? JSON.parse(savedReminders) : []);
    }
  }, [isLoggedIn, currentUserEmail]);

  // Persistent storage sync (only when logged in)
  useEffect(() => {
    if (isLoggedIn && currentUserEmail) {
      localStorage.setItem(getStorageKey('propmate_properties'), JSON.stringify(properties));
    }
  }, [properties, isLoggedIn, currentUserEmail]);

  useEffect(() => {
    if (isLoggedIn && currentUserEmail) {
      localStorage.setItem(getStorageKey('propmate_clients'), JSON.stringify(clients));
    }
  }, [clients, isLoggedIn, currentUserEmail]);

  useEffect(() => {
    if (isLoggedIn && currentUserEmail) {
      localStorage.setItem(getStorageKey('propmate_reminders'), JSON.stringify(reminders));
    }
  }, [reminders, isLoggedIn, currentUserEmail]);

  // Background Reminder Checker
  useEffect(() => {
    if (!isLoggedIn) return;
    const interval = setInterval(() => {
      const now = new Date();
      let changed = false;
      const updatedReminders = reminders.map(r => {
        if (!r.isCompleted && !r.notified && new Date(r.time) <= now) {
          changed = true;
          return { ...r, notified: true };
        }
        return r;
      });
      if (changed) setReminders(updatedReminders);
    }, 30000);
    return () => clearInterval(interval);
  }, [reminders, isLoggedIn]);

  const handleLogin = (email: string) => {
    setCurrentUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUserEmail(null);
    setActiveTab(NavigationTab.DASHBOARD);
    // Reset state to prevent flash of previous user's data
    setProperties([]);
    setClients([]);
    setReminders([]);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const addProperty = (prop: Property) => setProperties([prop, ...properties]);
  const addClient = (client: Client) => setClients([client, ...clients]);
  
  const addReminder = (rem: Reminder) => setReminders([rem, ...reminders]);
  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r => r.id === id ? { 
      ...r, 
      isCompleted: !r.isCompleted, 
      status: !r.isCompleted ? ReminderStatus.COMPLETED : ReminderStatus.PENDING 
    } : r));
  };
  const updateReminder = (id: string, updates: Partial<Reminder>) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, ...updates } : r));
  };
  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case NavigationTab.DASHBOARD:
        return <Dashboard properties={properties} clients={clients} reminders={reminders} onToggleReminder={toggleReminder} />;
      case NavigationTab.PROPERTIES:
        return <PropertiesPage properties={properties} onAdd={addProperty} />;
      case NavigationTab.CLIENTS:
        return <ClientsPage clients={clients} onAdd={addClient} onAutoMatch={(c) => { setPreselectedClient(c); setActiveTab(NavigationTab.MATCHING); }} />;
      case NavigationTab.MATCHING:
        return <MatchingPage properties={properties} clients={clients} initialClient={preselectedClient} />;
      case NavigationTab.REPORTS:
        return <ReportsPage properties={properties} clients={clients} reminders={reminders} />;
      case NavigationTab.SETTINGS:
        return <SettingsPage userPlan={userPlan} onUpgrade={() => setUserPlan('Premium')} onLogout={handleLogout} />;
      case NavigationTab.REMINDERS:
        return <RemindersPage 
                  reminders={reminders} 
                  clients={clients} 
                  properties={properties} 
                  onAdd={addReminder} 
                  onToggle={toggleReminder} 
                  onUpdate={updateReminder}
                  onDelete={deleteReminder} 
               />;
      default:
        return <Dashboard properties={properties} clients={clients} reminders={reminders} onToggleReminder={toggleReminder} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={(tab: any) => setActiveTab(tab)}
      userPlan={userPlan}
      onLogout={handleLogout}
      onQuickViewProperties={() => setActiveTab(NavigationTab.PROPERTIES)}
      onQuickViewClients={() => setActiveTab(NavigationTab.CLIENTS)}
      onQuickOpenReports={() => setActiveTab(NavigationTab.REPORTS)}
      onQuickOpenSettings={() => setActiveTab(NavigationTab.SETTINGS)}
      onGoHome={() => setActiveTab(NavigationTab.DASHBOARD)}
      reminders={reminders}
      onToggleReminder={toggleReminder}
      userEmail={currentUserEmail || ''}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
