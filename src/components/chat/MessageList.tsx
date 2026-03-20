import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import EmptyState from '../ui/EmptyState';

interface MessageType {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface MessageListProps {
  messages: MessageType[];
  isLoading?: boolean;
}

const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-bg-primary);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 3px;
  }
`;

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;
`;

// Создаем компонент для пустого div, на который будем ссылаться
const ScrollAnchor = styled.div`
  height: 1px;
`;

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading = false }) => {
  // Создаем ref для привязки к пустому div в конце списка
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Автоматическая прокрутка при изменении messages или isLoading
  useEffect(() => {
    // Плавно прокручиваем к последнему сообщению
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]); // Зависимости: когда меняются сообщения или состояние загрузки
  
  if (messages.length === 0) {
    return (
      <ListContainer>
        <EmptyState />
      </ListContainer>
    );
  }
  
  return (
    <ListContainer>
      <MessagesWrapper>
        {messages.map(message => (
          <Message
            key={message.id}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
        
        {/* Индикатор загрузки */}
        {isLoading && <TypingIndicator isVisible={true} />}
        
        {/* Пустой div для привязки ref - всегда в конце списка */}
        <ScrollAnchor ref={messagesEndRef} />
      </MessagesWrapper>
    </ListContainer>
  );
};

export default MessageList;