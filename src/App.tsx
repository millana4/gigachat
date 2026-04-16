import React, { lazy, Suspense, useEffect, useState } from 'react';
import './styles/theme.css';
import AppLayout from './components/layout/AppLayout';
import AuthForm from './components/auth/AuthForm';
import { useChatStore } from './store/chatStore';
import styled from 'styled-components';

// Ленивая загрузка SettingsPanel
const SettingsPanel = lazy(() => import('./components/settings/SettingsPanel'));

const FallbackLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--color-text-secondary);
  font-size: 14px;
`;

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { init, createNewChat, chats } = useChatStore();
  
  useEffect(() => {
    init();
  }, [init]);
  
  useEffect(() => {
    if (chats.length === 0) {
      createNewChat();
    }
  }, [chats.length, createNewChat]);
  
  const handleLogin = (credentials: { auth: string; scope: string }) => {
    console.log('Login attempt:', credentials);
    setIsAuthenticated(true);
  };
  
  if (!isAuthenticated) {
    return <AuthForm onLogin={handleLogin} />;
  }
  
  return (
    <>
      <AppLayout onOpenSettings={() => setIsSettingsOpen(true)} />
      <Suspense fallback={<FallbackLoader>Загрузка настроек...</FallbackLoader>}>
        <SettingsPanel 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
        />
      </Suspense>
    </>
  );
}

export default App;