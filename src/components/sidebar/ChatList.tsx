import React from 'react';
import styled from 'styled-components';
import ChatItem from './ChatItem';
import { Chat } from '../../types';

interface ChatListProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onEditChat: (chatId: string, newTitle: string) => void;
  onDeleteChat: (chatId: string) => void;
}

const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 -16px;
  padding: 0 16px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-bg-sidebar);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 3px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--color-text-secondary);
  font-size: 14px;
`;

const ChatList: React.FC<ChatListProps> = ({ 
  chats, 
  activeChatId, 
  onSelectChat, 
  onEditChat, 
  onDeleteChat 
}) => {
  if (chats.length === 0) {
    return (
      <ListContainer>
        <EmptyState>
          🤔 Нет чатов<br />
          Нажмите "Новый чат" чтобы начать
        </EmptyState>
      </ListContainer>
    );
  }
  
  return (
    <ListContainer>
      {chats.map(chat => {
        // Получаем последнее сообщение для отображения
        const lastMessage = chat.messages.length > 0 
          ? chat.messages[chat.messages.length - 1].content 
          : '';
        const lastMessagePreview = lastMessage.slice(0, 50) + (lastMessage.length > 50 ? '...' : '');
        
        return (
          <ChatItem
            key={chat.id}
            id={chat.id}
            title={chat.title}
            lastMessage={lastMessagePreview}
            lastMessageDate={chat.updatedAt}
            isActive={chat.id === activeChatId}
            onSelect={onSelectChat}
            onEdit={onEditChat}
            onDelete={onDeleteChat}
          />
        );
      })}
    </ListContainer>
  );
};

export default ChatList;