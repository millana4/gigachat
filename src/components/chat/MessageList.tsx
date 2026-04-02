import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import EmptyState from '../ui/EmptyState';
import { Message as MessageType } from '../../types';

interface MessageListProps {
  messages: MessageType[];
  isLoading?: boolean;
  streamingMessage?: string;
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

const ScrollAnchor = styled.div`
  height: 1px;
`;

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  isLoading = false,
  streamingMessage = '' 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, streamingMessage]);
  
  // Собираем все сообщения для отображения (включая streaming)
  const allMessages = [...messages];
  if (streamingMessage && !isLoading) {
    allMessages.push({
      id: 'streaming-temp',
      role: 'assistant',
      content: streamingMessage,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    });
  }
  
  if (allMessages.length === 0 && !streamingMessage) {
    return (
      <ListContainer>
        <EmptyState />
      </ListContainer>
    );
  }
  
  return (
    <ListContainer>
      <MessagesWrapper>
        {allMessages.map(message => (
          <Message
            key={message.id}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
        
        {isLoading && !streamingMessage && <TypingIndicator isVisible={true} />}
        
        <ScrollAnchor ref={messagesEndRef} />
      </MessagesWrapper>
    </ListContainer>
  );
};

export default MessageList;