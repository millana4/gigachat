import React, { lazy, Suspense, useState } from 'react';
import styled from 'styled-components';
import ChatWindow from '../chat/ChatWindow';
import { useChatStore } from '../../store/chatStore';

// Ленивая загрузка Sidebar
const Sidebar = lazy(() => import('../sidebar/Sidebar'));

interface AppLayoutProps {
  onOpenSettings?: () => void;
}

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: var(--color-bg-primary);
`;

const SidebarWrapper = styled.div<{ isOpen: boolean }>`
  width: 260px;
  height: 100%;
  background-color: var(--color-bg-sidebar);
  border-right: 1px solid var(--color-border);
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
    z-index: 1000;
  }
`;

const MainContent = styled.main`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-primary);
`;

const BurgerButton = styled.button`
  display: none;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1100;
  padding: 10px;
  background-color: var(--color-bg-sidebar);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-text-primary);
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 900;
  }
`;

const FallbackLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--color-text-secondary);
  font-size: 14px;
`;

const AppLayout: React.FC<AppLayoutProps> = ({ onOpenSettings }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { activeChatId } = useChatStore();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  
  return (
    <LayoutContainer>
      <BurgerButton onClick={toggleSidebar}>
        ☰
      </BurgerButton>
      
      <Overlay isOpen={isSidebarOpen} onClick={closeSidebar} />
      
      <SidebarWrapper isOpen={isSidebarOpen}>
        <Suspense fallback={<FallbackLoader>Загрузка чатов...</FallbackLoader>}>
          <Sidebar activeChatId={activeChatId || undefined} />
        </Suspense>
      </SidebarWrapper>
      
      <MainContent>
        {activeChatId ? (
          <ChatWindow 
            activeChatId={activeChatId}
            onOpenSettings={onOpenSettings} 
          />
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <p>Выберите чат или создайте новый</p>
          </div>
        )}
      </MainContent>
    </LayoutContainer>
  );
};

export default AppLayout;