import React from 'react';
import styled from 'styled-components';
import SearchInput from './SearchInput';
import ChatList from './ChatList';
import { mockChats } from '../../utils/mockData';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
`;

const NewChatButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  margin-bottom: 16px;
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: var(--color-bg-secondary);
  }
`;

interface SidebarProps {
  activeChatId: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeChatId }) => {
  return (
    <SidebarContainer>
      <NewChatButton>
        <span>+</span>
        Новый чат
      </NewChatButton>
      
      <SearchInput />
      
      <ChatList chats={mockChats} activeChatId={activeChatId} />
    </SidebarContainer>
  );
};

export default Sidebar;