import React, { useState } from 'react';
import styled from 'styled-components';

interface ChatItemProps {
  id: string;
  title: string;
  lastMessageDate: string;
  isActive: boolean;
  onSelect?: (id: string) => void;
}

const ItemContainer = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin: 4px 0;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${props => props.$isActive ? 'var(--color-bg-secondary)' : 'transparent'};
  width: 100%;
  box-sizing: border-box;
  
  &:hover {
    background-color: var(--color-bg-secondary);
    
    .chat-actions {
      display: flex;
    }
  }
`;

const ChatInfo = styled.div`
  flex: 1;
  overflow: hidden;
  min-width: 0;
`;

const ChatTitle = styled.div`
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
`;

const ChatDate = styled.div`
  color: var(--color-text-secondary);
  font-size: 12px;
`;

const ChatActions = styled.div`
  display: none;
  gap: 8px;
  flex-shrink: 0;
  margin-left: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 4px;
  font-size: 14px;
  
  &:hover {
    color: var(--color-text-primary);
  }
`;

const ChatItem: React.FC<ChatItemProps> = ({ 
  id, 
  title, 
  lastMessageDate, 
  isActive,
  onSelect 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSelect = () => {
    if (onSelect) {
      onSelect(id);
    }
  };
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    console.log('Edit chat', id);
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Delete chat', id);
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };
  
  return (
    <ItemContainer $isActive={isActive} onClick={handleSelect}>
      <ChatInfo>
        <ChatTitle>{title}</ChatTitle>
        <ChatDate>{formatDate(lastMessageDate)}</ChatDate>
      </ChatInfo>
      
      <ChatActions className="chat-actions">
        <ActionButton onClick={handleEdit}>✎</ActionButton>
        <ActionButton onClick={handleDelete}>🗑</ActionButton>
      </ChatActions>
    </ItemContainer>
  );
};

export default ChatItem;