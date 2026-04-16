import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import SearchInput from './SearchInput';
import ChatList from './ChatList';
import { useChatStore } from '../../store/chatStore';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
`;

const NewChatButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  margin-bottom: 16px;
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  
  &:hover {
    background-color: var(--color-bg-secondary);
  }
`;

// Модальное окно для подтверждения удаления
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background-color: var(--color-bg-primary);
  border-radius: 12px;
  padding: 24px;
  width: 320px;
  max-width: 90%;
  border: 1px solid var(--color-border);
`;

const ModalTitle = styled.h3`
  color: var(--color-text-primary);
  margin: 0 0 16px 0;
  font-size: 18px;
`;

const ModalText = styled.p`
  color: var(--color-text-secondary);
  margin: 0 0 24px 0;
  font-size: 14px;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const ModalButton = styled.button<{ variant?: 'danger' }>`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  background-color: ${props => props.variant === 'danger' ? '#dc3545' : 'var(--color-border)'};
  color: ${props => props.variant === 'danger' ? 'white' : 'var(--color-text-primary)'};
  
  &:hover {
    opacity: 0.9;
  }
`;

interface SidebarProps {
  activeChatId?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeChatId }) => {
  const { chats, createNewChat, setActiveChat, updateChatTitle, deleteChat } = useChatStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  
  // Поиск по чатам (по названию и последнему сообщению)
  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return chats;
    
    const query = searchQuery.toLowerCase().trim();
    return chats.filter(chat => {
      // Поиск по названию
      if (chat.title.toLowerCase().includes(query)) return true;
      
      // Поиск по последнему сообщению
      const lastMessage = chat.messages[chat.messages.length - 1];
      if (lastMessage && lastMessage.content.toLowerCase().includes(query)) return true;
      
      return false;
    });
  }, [chats, searchQuery]);
  
  const handleNewChat = useCallback(() => {
    const newChatId = createNewChat();
    console.log('New chat created:', newChatId);
  }, [createNewChat]);
  
  const handleSelectChat = useCallback((chatId: string) => {
    console.log('Sidebar handleSelectChat called with:', chatId);
    setActiveChat(chatId);
  }, [setActiveChat]);
  
  const handleEditChat = useCallback((chatId: string, newTitle: string) => {
    updateChatTitle(chatId, newTitle);
  }, [updateChatTitle]);
  
  const handleDeleteClick = useCallback((chatId: string) => {
    setChatToDelete(chatId);
  }, []);
  
  const handleConfirmDelete = () => {
    if (chatToDelete) {
      deleteChat(chatToDelete);
      setChatToDelete(null);
    }
  };
  
  const handleCancelDelete = () => {
    setChatToDelete(null);
  };
  
  return (
    <>
      <SidebarContainer>
        <NewChatButton onClick={handleNewChat}>
          <span>+</span>
          Новый чат
        </NewChatButton>
        
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        
        <ChatList 
          chats={filteredChats}
          activeChatId={activeChatId || null}
          onSelectChat={handleSelectChat}
          onEditChat={handleEditChat}
          onDeleteChat={handleDeleteClick}
        />
      </SidebarContainer>
      
      {/* Модальное окно подтверждения удаления */}
      {chatToDelete && (
        <ModalOverlay onClick={handleCancelDelete}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Удалить чат?</ModalTitle>
            <ModalText>
              Вы уверены, что хотите удалить этот чат? Это действие нельзя отменить.
            </ModalText>
            <ModalButtons>
              <ModalButton onClick={handleCancelDelete}>Отмена</ModalButton>
              <ModalButton variant="danger" onClick={handleConfirmDelete}>Удалить</ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Sidebar;