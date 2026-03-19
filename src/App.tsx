import React, { useState } from 'react';
import './styles/theme.css';
import AppLayout from './components/layout/AppLayout';
import SettingsPanel from './components/settings/SettingsPanel';
import AuthForm from './components/auth/AuthForm';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLogin = (credentials: { auth: string; scope: string }) => {
    // Здесь потом будет реальная авторизация
    console.log('Login attempt:', credentials);
    setIsAuthenticated(true);
  };
  
  if (!isAuthenticated) {
    return <AuthForm onLogin={handleLogin} />;
  }
  
  return (
    <>
      <AppLayout onOpenSettings={() => setIsSettingsOpen(true)} />
      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
}

export default App;