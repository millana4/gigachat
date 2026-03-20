import React from 'react';
import styled from 'styled-components';
import ChatItem from './ChatItem';

interface Chat {
  id: string;
  title: string;
  lastMessageDate: string;
  isActive: boolean;
}

interface ChatListProps {
  chats: Chat[];
  activeChatId: string;
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

const ChatList: React.FC<ChatListProps> = ({ chats, activeChatId }) => {
  const handleSelectChat = (chatId: string) => {
    console.log('Selected chat:', chatId);
  };
  
  return (
    <ListContainer>
      {chats.map(chat => (
        <ChatItem
          key={chat.id}
          id={chat.id}
          title={chat.title}
          lastMessageDate={chat.lastMessageDate}
          isActive={chat.id === activeChatId}
          onSelect={handleSelectChat}
        />
      ))}
    </ListContainer>
  );
};

export default ChatList;