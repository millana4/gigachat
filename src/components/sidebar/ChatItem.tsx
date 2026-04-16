import React, { useState } from 'react';
import styled from 'styled-components';

interface ChatItemProps {
  id: string;
  title: string;
  lastMessage: string;  // добавляем последнее сообщение для поиска
  lastMessageDate: string;
  isActive: boolean;
  onSelect?: (id: string) => void;
  onEdit?: (id: string, newTitle: string) => void;
  onDelete?: (id: string) => void;
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

const ChatLastMessage = styled.div`
  color: var(--color-text-secondary);
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatDate = styled.div`
  color: var(--color-text-secondary);
  font-size: 11px;
  margin-top: 4px;
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
  border-radius: 4px;
  
  &:hover {
    background-color: var(--color-border);
    color: var(--color-text-primary);
  }
`;

const EditInput = styled.input`
  width: 100%;
  padding: 4px 8px;
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-text-primary);
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ChatItem: React.FC<ChatItemProps> = ({ 
  id, 
  title, 
  lastMessage,
  lastMessageDate, 
  isActive,
  onSelect,
  onEdit,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);
  
  const handleSelect = () => {
    console.log('ChatItem clicked, id:', id, 'isEditing:', isEditing);
    if (onSelect && !isEditing) {
      console.log('Calling onSelect with id:', id);
      onSelect(id);
    }
  };
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditValue(title);
  };
  
  const handleSaveEdit = () => {
    if (editValue.trim() && onEdit) {
      onEdit(id, editValue.trim());
    }
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(title);
    }
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Вчера';
    } else if (diffDays < 7) {
      return `${diffDays} дня назад`;
    } else {
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    }
  };
  
  return (
    <ItemContainer $isActive={isActive} onClick={handleSelect}>
      <ChatInfo>
        {isEditing ? (
          <EditInput
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <>
            <ChatTitle>{title}</ChatTitle>
            <ChatLastMessage>{lastMessage || 'Новый чат'}</ChatLastMessage>
            <ChatDate>{formatDate(lastMessageDate)}</ChatDate>
          </>
        )}
      </ChatInfo>
      
      {!isEditing && (
        <ChatActions className="chat-actions">
          <ActionButton onClick={handleEdit} title="Редактировать">✎</ActionButton>
          <ActionButton onClick={handleDelete} title="Удалить">🗑</ActionButton>
        </ChatActions>
      )}
    </ItemContainer>
  );
};

export default React.memo(ChatItem);